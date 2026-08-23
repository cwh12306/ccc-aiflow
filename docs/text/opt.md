---
# 元数据区 (用于过滤和分类)
doc_type: 操作指南
product: 智能文档系统
version: v3.2
target_audience: 系统管理员
maintainer: 技术文档部
last_updated: 2026-07-18
---

# 1. 概述

## 1.1 文档目的

本文档旨在指导系统管理员完成**智能文档系统 (IDS) v3.2** 的标准安装流程。

## 1.2 适用环境

- 操作系统：Ubuntu 22.04 LTS 或 CentOS 9 Stream
- 硬件要求：最低 8GB RAM，4核 CPU，50GB 可用磁盘空间

## 1.3 前置条件

在开始安装前，请确保已完成以下操作：

1. 拥有服务器的 `root` 权限或 `sudo` 权限。
2. 已开放必要的防火墙端口：`80` (HTTP), `443` (HTTPS), `3306` (MySQL)。

---

# 2. 安装步骤

## 2.1 环境依赖安装

在终端中执行以下命令，更新包列表并安装基础依赖：

```bash
sudo apt update
sudo apt install -y curl gnupg2 software-properties-common
```
