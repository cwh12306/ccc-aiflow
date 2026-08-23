<!-- cspell:words Turborepo dotenv -->

<div align="center">

<h1>CCC AI Flow</h1>
<p>可视化 AI 工作流编排、发布与知识库平台</p>

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white" />
  <img alt="Qdrant" src="https://img.shields.io/badge/Qdrant-Vector_DB-DC244C" />
</p>

</div>

## 项目简介

CCC AI Flow 是一个可视化 AI 工作流平台，支持通过拖拽节点完成工作流设计、测试运行、版本发布和 API 调用，并可结合知识库为 LLM 提供检索增强能力。

项目采用 pnpm + Turborepo 管理多个应用：Next.js 提供工作流管理界面，NestJS 提供已发布工作流的公开执行 API，共享的 AI Engine 负责图校验、节点调度、变量解析和知识检索。

主要功能：

- 可视化编排 Start、LLM、HTTP、Condition、Knowledge、End 节点
- SSE 实时展示工作流运行状态、日志和输出
- 工作流版本发布、API Key 管理和公开 API 调用
- 文档上传、向量化，以及 Vector / Full-text / Hybrid 检索
- 执行记录、调用趋势、成功率和耗时监控

## 快速启动

### 环境要求

- Node.js 22+
- pnpm 9.12.3
- Docker Desktop / Docker Compose
- OpenAI-compatible Chat Model 和 Embedding Model 服务

### 1. 安装依赖

```bash
git clone <your-repository-url>
cd ccc-aiflow
pnpm install
```

### 2. 配置环境变量

在项目根目录创建 `.env`：

```dotenv
POSTGRES_PASSWORD=postgres
```

复制应用配置：

```bash
cp apps/workflow/.env.example apps/workflow/.env
cp apps/workflow/.env.example apps/api-server/.env
```

在两个应用的 `.env` 中配置数据库、Qdrant 和模型服务：

```dotenv
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
QDRANT_URL="http://localhost:6333"

API_KEY="your_api_key"
BASE_URL="https://your-provider.example/v1"
MODEL="your_chat_model"
EMBEDDING_MODEL="your_embedding_model"

NEXT_PUBLIC_API_SERVER_URL="http://localhost:3100"
NEXT_PUBLIC_WEBAPP_URL="http://localhost:3001"
```

### 3. 启动基础设施并初始化数据库

```bash
pnpm docker:start

pnpm --filter @ccc-aiflow/workflow exec prisma generate
pnpm --filter @ccc-aiflow/api-server exec prisma generate
pnpm --filter @ccc-aiflow/workflow exec prisma migrate deploy
pnpm --filter @ccc-aiflow/ai-engine build
```

### 4. 启动服务

启动管理端：

```bash
pnpm dev
```

如需调用公开 API，再启动 NestJS 服务：

```bash
pnpm --filter @ccc-aiflow/api-server start:dev
```

| 服务            | 地址                           |
| --------------- | ------------------------------ |
| Workflow Studio | <http://localhost:3000>        |
| Public API      | <http://localhost:3100/api/v1> |
| Qdrant          | <http://localhost:6333>        |

## 系统截图

### 工作室

> 截图占位：应用列表、搜索筛选和创建入口。

![工作室](docs/images/workbench.png)

### 工作流编辑器

> 截图占位：节点画布、节点连线和右侧配置面板。

![工作流编辑器](docs/images/workflow-editor.png)

### 测试运行

> 截图占位：节点运行状态、SSE 日志和最终输出。

![测试运行](docs/images/workflow-run.png)

### 知识库

> 截图占位：文档列表、切片详情或召回测试结果。

![知识库](docs/images/knowledge-base.png)
