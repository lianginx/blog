---
title: "Homebrew 安装与使用"
date: "2023-06-17"
description: "macOS Homebrew包管理器安装与使用指南，掌握brew install、search、upgrade等常用命令，高效管理软件包。"
tags:
  - macos
  - cli
  - guide
---

Homebrew 是一个软件包管理器，支持 macOS 和 Linux，它可以让你一个命令快速安装软件，而不需要再去下载之后用鼠标把 APP 拖到应用程序文件夹中。

## 如何安装

安装脚本来自：[Homebrew 国内镜像](https://brew.idayer.com/)，安装成功后需要重启终端才能使用。

```sh
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```

> 默认使用中科大镜像源，如果需要换源参考 [换源](https://brew.idayer.com/guide/change-source/)。

## 常用命令

| 命令                         | 说明                           | 其他                                      |
| ---------------------------- | ------------------------------ | ----------------------------------------- |
| brew install [--cask] [name] | 安装软件                       | cask 表示 GUI 软件                        |
| brew uninstall [name]        | 卸载软件                       |                                           |
| brew search [name]           | 搜索软件                       | [通过网页搜索](https://formulae.brew.sh/) |
| brew info [name]             | 查看软件信息                   |                                           |
| brew list                    | 查看已安装软件                 |                                           |
| brew update                  | 更新 Homebrew                  |                                           |
| brew upgrade [name]          | 更新全部（某个）软件           |                                           |
| brew cleanup [name]          | 清理全部（某个）软件的历史版本 |                                           |
| brew tap [user/repo]         | 添加 tap                       |                                           |
| brew tap                     | 查看已添加的 tap               |                                           |
| brew untap [user/repo]       | 删除 tap                       |                                           |

## 常用软件包

### 命令行工具

```bash
brew install eza        # 现代化 ls（带图标和颜色）
brew install bat        # 现代化 cat（语法高亮）
brew install fzf        # 模糊搜索（Ctrl+R 历史命令）
brew install zoxide     # 快速跳转目录（cd 替代品）
brew install ripgrep    # 现代化 grep（速度更快）
brew install fd         # 快速查找文件
brew install gh         # GitHub CLI
brew install starship   # 终端美化提示符
brew install yazi       # 终端文件管理器
brew install yt-dlp     # 视频下载
brew install pyenv      # Python 版本管理
brew install jq         # JSON 处理
```

### GUI 应用

```bash
brew install --cask ghostty                 # 终端模拟器
brew install --cask visual-studio-code      # vscode
brew install --cask google-chrome           # Chrome 浏览器
brew install --cask wechat                  # 微信
brew install --cask telegram                # Telegram
brew install --cask obsidian                # markdown 编辑器
brew install --cask iina                    # 视频播放器
brew install --cask orbstack                # Docker 虚拟机（比 Docker Desktop 轻量）
brew install --cask karabiner-elements      # 键盘映射
brew install --cask qlmarkdown              # 空格预览 Markdown
brew install --cask chatgpt                 # ChatGPT 客户端
brew install --cask apifox                  # API 调试工具
brew install --cask netnewswire             # RSS 阅读器
brew install --cask font-maple-mono-nf-cn   # 编程字体
```
