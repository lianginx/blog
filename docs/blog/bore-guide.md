---
title: "Bore Cli 内网穿透指南"
date: "2026-07-07"
description: "Bore 是一个用 Rust 编写的现代、简单的 TCP 隧道工具，可将本地端口暴露给远程服务器，从而绕过标准的 NAT 连接防火墙。它的功能仅此而已：不多也不少。"
tags:
  - guide
  - network
  - cli
  - macos
---

[Bore](https://github.com/ekzhang/bore) 是一个用 Rust 编写的现代、简单的 TCP 隧道工具，可将本地端口暴露给远程服务器，从而绕过标准的 NAT 连接防火墙。

## 客户端

macOS 使用 Homebrew 安装：

```bash
brew install bore-cli
```

暴露本机 3000 端口穿透到 Bore 提供的官方服务器：

```bash
bore local 3000 --to bore.pub

# 输出日志
# connected to server remote_port=37749
# listening at bore.pub:37749
```

此时 `localhost:3000` 已经可以通过 `bore.pub:37749` 直接访问。

## 服务端

虽然 Bore 提供了一个官方服务器，但是从国内访问非常慢，基本不能用，所以还是需要自己部署一个服务端。

根据自己服务器的 Linux 发行版本和 CPU 架构前往 [Github 发布页](https://github.com/ekzhang/bore/releases) 下载预编译的二进制文件。

```bash
# 查看 Linux 发行版本
cat /etc/os-release

# 查看 CPU 架构
uname -m
```

```bash
# 服务端：启动服务
bore server

# 客户端：连接自定义服务器
bore local <local-port> --to <server-ip>
```

## 配置防火墙开放端口

以阿里云为例，需要登录阿里云服务器后台开放 `7835` 端口作为 Bore 的控制端口，如果服务器上安装了宝塔面板，可能还需要到宝塔防火墙中开放对应端口。

当 Bore 客户端通过 `7835` 端口连接服务器的时候，Bore 会在默认端口范围随机分配端口用于穿透，所以我们还需要再开放一组端口用于分配。

不建议直接使用默认范围（1024-65535），可以先在防火墙开放一小段端口，然后在运行服务端时配置分配端口最小值、最大值：

```bash
# 配置分配端口范围：40000-40100
bore server --min-port 40000 --max-port 40100
```

## 配置密码认证

默认不设置密码，一旦运行起来服务端，任何知道服务器 IP 的人都可以像你一样，通过 Bore 直接进行内网穿透。

> 我们当然不希望被别人白嫖！

其实最主要还是网络安全风险，防止被不法分子通过我们的服务器分发非法内容。

```bash
# 服务端：启动服务并配置密码
bore server -s <password>

# 客户端：连接自定义服务器
bore local <local-port> --to <server-ip> -s <password>
```

只要客户端输入的密码与服务端配置的一致就可以正常连接了。

## 总结

至此，你就拥有了一个属于自己的内网穿透服务。相比 frp 等传统方案，Bore 的配置极其简单，不需要写任何配置文件，几条命令就能跑起来。

如果你只是偶尔需要把本地服务暴露出去调试一下，Bore 是一个刚刚好的选择。

> That's all it does: no more, and no less
>
> 它的功能仅此而已：不多也不少。
