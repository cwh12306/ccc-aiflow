FROM node:22-alpine@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2 AS base

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# 设置工作目录
WORKDIR /app

# ==================== 依赖安装阶段 ====================
FROM base AS deps

# 复制包管理文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/workflow/package.json ./apps/workflow/
COPY packages/ai-engine/package.json ./packages/ai-engine/

# 安装依赖
RUN pnpm install --frozen-lockfile

# ==================== 构建阶段 ====================
FROM base AS builder

WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/workflow/node_modules ./apps/workflow/node_modules
COPY --from=deps /app/packages/ai-engine/node_modules ./packages/ai-engine/node_modules

# 复制源代码
COPY . .

# 设置环境变量
ARG NEXT_PUBLIC_WEBAPP_URL
ENV NEXT_PUBLIC_WEBAPP_URL=${NEXT_PUBLIC_WEBAPP_URL}
# Next.js 在构建期会加载 Prisma 配置；运行期由 Compose 注入真实连接串。
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# 构建应用
RUN pnpm --filter @ccc-aiflow/workflow build

# ==================== 数据库迁移阶段 ====================
FROM builder AS migrator

CMD ["pnpm", "--filter", "@ccc-aiflow/workflow", "exec", "prisma", "migrate", "deploy", "--config", "prisma.config.ts"]

# ==================== 运行阶段 ====================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/apps/workflow/.next/standalone ./
COPY --from=builder /app/apps/workflow/.next/static ./apps/workflow/.next/static
COPY --from=builder /app/apps/workflow/public ./apps/workflow/public

# 设置权限
USER nextjs

# 暴露端口
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动命令
CMD ["node", "apps/workflow/server.js"]
