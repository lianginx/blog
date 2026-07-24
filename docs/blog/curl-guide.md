---
title: "curl 使用说明"
date: "2026-07-24"
description: "curl 命令行工具常用参数与使用技巧，涵盖网页获取、文件下载、HTTP 请求发送等场景。"
tags:
  - guide
  - cli
---

curl 是一个功能极其强大的命令行工具，它的基本语法非常简单：

```bash
curl [options] [URL...]
```

## 获取网页内容

直接在控制台打印网页内容。

```bash
curl http://example.com
```

`-L` 跟随 301/302 等重定向响应。
```bash
curl -L http://www.example.com
```

`-i` 显示响应头信息。

```bash
curl -i http://example.com
# [响应 Header]
# [响应内容]
```

`-I` 仅显示响应头信息。

```bash
curl -I http://example.com
# [响应 Header]
```

`-v` 显示详细通信过程，包括DNS解析、建立连接、发送的请求头和收到的响应头到网页正文整个通信过程的详细信息。

```bash
curl -v http://example.com
# [DNS 解析]
# [TCP 连接]
# [TLS 握手]
# [HTTP 请求]
# ……
# [HTTP 响应]
```

## 下载文件

`-o` （小写）指定文件名保存。

```bash{2}
curl \
  -o local-file.zip \
  http://example.com/remote-file.zip
```

`-O` （大写）使用远程文件名保存。

```bash
curl -O http://example.com/remote-file.zip
```

`-C -` 断点续传。

```bash
curl -C - -O http://example.com/large-file.zip
```

## 发送 HTTP 请求

curl 默认就是 GET 请求。

```bash
curl "http://httpbin.org/get?name=Tom&age=25"
```

发送 POST 请求，需要设置参数：

`-X` 指定请求方法：`GET` / `POST` / `PUT` / `DELETE` 等。

`-d` 发送数据。

```bash
curl \
  -X POST \
  -d "name=Tom&age=25" \
  http://example.com/resource
```

发送 JSON 数据，注意必须设置 `Content-Type` 请求头，因为默认的 `Content-Type` 为 `application/x-www-form-urlencoded`。

`-H` 指定请求头，可重复使用添加多个。

```bash{3,4}
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Tom", "age": 25}' \
  http://example.com/api/users
```

`@` 可以在 curl 参数中引用文件路径：

比如要发送的数据很复杂，可以保存到文件，然后通过 `@` 引用文件路径。

::: code-group

```bash{4} [Terminal]
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d @data.json \
  http://example.com/api/users
```

```json [data.json]
{
  "name": "Tom",
  "age": 25
}
```

:::

如果要发送的请求头比较多，也可以保存到文件（需要 curl 7.55.0+）。

::: code-group

```bash{3,4} [Terminal]
curl \
  -X POST \
  -H @headers.txt \
  -d @data.json \
  http://example.com/api/users
```

```txt [headers.txt]
User-Agent: MyClient
Authorization: Bearer abc123
Accept: application/json
```

```json [data.json]
{
  "name": "Tom",
  "age": 25
}
```

:::

`-F` 可以模拟表单上传文件，这里的 `@` 与前面描述的作用一样。

```bash{2}
curl \
  -F "avatar=@avatar.jpg" \
  http://example.com/upload
```

## 其他参数

`-s` 静默模式，不输出任何非请求结果本身的任何信息。

主要作用就是只输出 HTTP 响应体，可以配合管道传输干净的数据，不会出现任何打印给人类阅读的信息或提示。

如果请求在底层连接阶段就失败了（例如 DNS 解析失败、无法连接到服务器、SSL 握手报错），将不会输出任何内容。

```bash
curl -s http://example.com
# [响应内容]
```

`-#` 下载时显示进度条。

```bash
curl -# -O http://example.com/file.zip
# ######################## 100.0%
```

`-x` 指定 HTTP 代理服务器进行连接。

```bash{2}
curl \
  -x http://proxy.example.com \
  http://example.com
```

`-k` 当访问自签名证书的HTTPS网站时，可以用此参数忽略证书错误。

```bash{2}
curl -k https://example.com
```

`--limit-rate` 限制下载速度，单位为 `B` / `K` / `M` / `G`。

```bash{2}
curl \
  --limit-rate 1M \
  -O \
  http://example.com/file.zip
```
