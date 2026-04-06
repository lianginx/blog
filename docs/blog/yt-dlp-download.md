---
title: "yt-dlp 下载 YouTube/Bilibili 视频"
date: "2026-03-26"
description: "使用yt-dlp命令行工具下载YouTube和Bilibili视频的实用教程，包括格式选择和Cookies配置。"
tags:
  - cli
---

安装 [yt-dlp](https://github.com/yt-dlp/yt-dlp)

```shell
scoop install yt-dlp  # windows
brew install yt-dlp   # macOS
```

下载视频

```shell
yt-dlp [video_url]
```

使用浏览器 Cookies 下载视频

```shell
yt-dlp --cookies-from-browser [browser] [video_url]
```

> 支持的浏览器：brave、chrome、chromium、edge、firefox、opera、safari、vivaldi、whale。

查看可下载的文件格式，不下载

```shell
yt-dlp --list-formats [video_url]

# 输出
ID     EXT RESOLUTION FPS │   FILESIZE   TBR PROTO │ VCODEC          VBR ACODEC      ABR
────────────────────────────────────────────────────────────────────────────────────────
30280  m4a audio only     │ ≈ 35.30MiB  207k https │ audio only          mp4a.40.2  207k
100026 mp4 1920x1080   30 │ ≈143.41MiB  839k https │ av01.0.00M.10  839k video only
```

下载指定的文件格式

```shell
yt-dlp --format [format_id] [video_url]

# 示例
yt-dlp --format 30280 [video_url]         # 下载音频
yt-dlp --format 100026 [video_url]        # 下载视频
yt-dlp --format 30280+100026 [video_url]  # 下载音频+视频，合并成视频
```

查看更多支持下载的视频网站：[Supported sites](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)
