---
title: "fake-ip 导致 Windows 显示「无网络」图标"
date: "2026-10-05"
description: "解决 Mihomo fake-ip 模式下 Windows 托盘持续显示无网络图标的问题，通过 fake-ip-filter 让 NCSI 探针域名返回真实 IP。"
tags:
  - guide
  - network
  - windows
  - clash
  - mihomo
---

配了 TUN 模式之后，Windows 托盘的网络图标一直显示小地球（无网络），但浏览器、微信全都正常上网。

排查了一堆 TUN 路由设置都没问题，最后定位到是 fake-ip 与 Windows 的联网状态检测机制冲突导致。

## 原因

fake-ip 模式下 DNS 不做真实解析，直接从 `198.18.0.0/16` 里分配一个地址返回，内核再维护「假 IP → 真实域名」的映射表，连接时反查域名向外建连。

它省去了 DNS 解析延迟，但也让任何依赖解析结果本身的逻辑失效。

Windows 判断「有没有网」靠的是 NCSI，它会主动发起探测，探测方式有两种：

- **DNS 探针**：解析 `dns.msftncsi.com`，校验 A 记录值是否等于 `131.107.255.255`
- **HTTP 探针**：请求 `www.msftconnecttest.com/connecttest.txt`，校验响应体是否等于 `Microsoft Connect Test`

fake-ip 只让 DNS 探针失效：NCSI 拿到的是 `198.18.x.x`，和硬编码的 `131.107.255.255` 对不上，于是判定无网络。

HTTP 探针不受影响，它的请求带的是真实的 `Host` 头，Mihomo 反查映射表照常建连，响应体校验照样通过。

::: details NCSI 的探测规则

上面两种探测并不会每次都一起跑，也不是必须都通过：

- Windows 11 起始终使用 HTTP 探测，日志里看到的 DNS 活动只是用来定位 HTTP 探测要发到哪里，所以在 Windows 11 上开 fake-ip 一般不会遇到这个问题。
- Windows 10 及更早，无代理时使用 DNS 探测，检测到代理或需要强制 web 探测时才用 HTTP，Wi-Fi 与 IPv6 接口则始终用 HTTP。本文正是无代理的场景，NCSI 只跑 DNS 探测，拿到 fake-ip 返回的 `198.18.x.x` 后判定无网络。
- 真正并行发送的是 IPv4 与 IPv6 两个探测，任一成功即判定有 Internet 访问。
- 主动探测之外还有被动探测，每 15 秒统计收包跳数，达到默认阈值 8 就把状态抬到 Internet，主动探测失败时有机会把图标救回来；两者都不达标才显示无网络，事件日志里表现为 `SuspectDnsProbeFailed`。

:::

## 解决方案

把 DNS 探针域名加入 `dns.fake-ip-filter`，让它返回真实 IP 即可。

```yaml
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-filter:
    - 'rule-set:geosite-private'
    - 'rule-set:geosite-category-ntp'
    - 'rule-set:geosite-category-games'
    - '+.msftncsi.com' # [!code ++]
```

`+.` 前缀同时匹配该域名本身和它的所有子域，正好覆盖 `dns.msftncsi.com`。

## 验证

改完配置必须重启内核或重载配置，光改文件不生效。

重载后 `nslookup dns.msftncsi.com` 应返回 `131.107.255.255`，托盘图标恢复正常。

## 参考文档

- [关于 NCSI（网络连接状态指示器）的常见问题的解答](https://learn.microsoft.com/zh-cn/windows-server/networking/ncsi/ncsi-frequently-asked-questions)
- [NCSI 故障排除指南](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/troubleshoot-ncsi-guidance)
- [Mihomo DNS 配置文档](https://wiki.metacubex.one/config/dns/)
