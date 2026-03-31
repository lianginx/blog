---
title: Projects
layout: page

projects:
  - title: homebrew-search
    description: 简洁美观的 Homebrew Cask / Formula 快速搜索工具，支持深色模式与响应式布局。
    tag: 工具
    links:
      - type: github
        url: https://github.com/lianginx/homebrew-search
      - type: home
        url: https://brew.in-x.cc

  - title: capslock-yes
    description: Karabiner-Elements 键位映射规则，将 CapsLock 变为功能键，扩展基于 CapsLock 的快捷键组合。
    tag: 工具
    links:
      - type: github
        url: https://github.com/lianginx/capslock-yes

  - title: crontab
    description: 面向中文用户的 Cron 表达式可视化工具，支持中文解析与执行时间预览，灵感来源于 crontab.guru。
    tag: 工具
    links:
      - type: github
        url: https://github.com/lianginx/crontab
      - type: home
        url: https://crontab.in-x.cc

  - title: steam-screenshot-downloader
    description: 用于批量下载 Steam 截图的 Python 工具，支持指定用户与保存路径配置。
    tag: 工具
    links:
      - type: github
        url: https://github.com/lianginx/steam-screenshot-downloader

  - title: chatgpt-vue
    description: 基于 Vue 3 + TypeScript + Tailwind CSS 实现的纯前端 ChatGPT 对话应用，支持连续对话与流式输出。
    tag: 停止维护
    links:
      - type: github
        url: https://github.com/lianginx/chatgpt-vue
      - type: home
        url: https://chatgpt-vue-liang-n.vercel.app

  - title: chatgpt-nuxt
    description: 基于 Nuxt.js 的 ChatGPT 类项目，支持 OpenAI 与 Azure API 切换，具备黑暗模式与中英日多语言支持。
    tag: 停止维护
    links:
      - type: github
        url: https://github.com/lianginx/chatgpt-nuxt
---

<ProjectItem :items="$frontmatter.projects" />
