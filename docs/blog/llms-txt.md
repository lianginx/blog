---
title: "博客实现 llms.txt 支持"
date: "2026-10-09"
description: "博客新增 llms.txt 与文章 Markdown 原文，AI 助手可直接读取文章内容，无需再解析 HTML。"
tags:
  - AI
---

[llms.txt](https://llmstxt.org/) 是一份放在网站根目录的 Markdown 文件，用于向 AI 助手说明站点里有什么，并提供可直接读取的 Markdown 原文。

网页里的文章夹杂着导航、侧边栏和脚本，AI 抓取后还需要再清洗一遍才能用。于是给博客补上了这份文件，同时为每篇文章生成了 Markdown 原文。

全站索引：

```txt
https://in-x.cc/llms.txt
```

其中按年份列出所有文章和项目，每一项都是一行链接加说明。

文章原文的地址是 `https://in-x.cc/blog/<slug>.md`，例如：

```txt
https://in-x.cc/blog/fake-ip-windows-no-network.md
```

把索引地址发给 AI 助手，它会读取目录，再按需获取对应的原文。

## 参考文档

- [llms.txt 规范](https://llmstxt.org/)
- [提案仓库 AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt)
