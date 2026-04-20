# 开发规范

本文档定义项目的开发规范，所有 subagent 必须遵循。

---

## 测试驱动开发（TDD）

### 原则

1. **红**：先写一个失败的测试
2. **绿**：写最简代码让测试通过
3. **重构**：改善代码，测试仍通过

### 要求

| 层级 | 要求 |
|------|------|
| 后端（Node.js） | 每个业务逻辑必须先写测试，再实现 |
| 前端（Vue） | 核心组件必须写单元测试 |

### 测试框架

| 语言 | 框架 |
|------|------|
| Node.js | Jest 或 Vitest |
| Vue/TS | Vitest |

---

## 代码风格

### Node.js

- 使用 ESLint + Prettier 格式化代码
- 遵循 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) 规范
- 错误处理：使用 `try/catch`，不得忽略错误
- 命名：驼峰命名，文件使用 kebab-case

### TypeScript/Vue

- 使用 ESLint + Prettier
- 类型定义：优先使用 `interface`，而非 `type`
- Vue 组件：使用 Composition API + `<script setup>`
- 组件命名：PascalCase

---

## Git 规范

### 分支命名

```
feature/<模块>-<功能名>    # 新功能
fix/<模块>-<问题描述>       # 修复
chore/<描述>               # 杂项
```

### Commit 规范

```
<类型>(<模块>): <简短描述>

类型：feat | fix | docs | style | refactor | test | chore
```

示例：
```
feat(task): 添加任务创建功能
fix(dimension): 修复时间范围校验问题
```

---

## API 设计原则

1. **RESTful**：使用标准 HTTP 方法
2. **JSON**：请求和响应使用 JSON 格式
3. **版本**：API 不做版本化，通过路径区分
4. **错误**：`{ "error": "错误信息" }`

---

## 代码组织

### Node.js 后端

```
/server
  /src
    /routes      # 路由
    /controllers # 控制器
    /models      # 数据模型
    /middleware  # 中间件
    /utils       # 工具函数
```

### Vue 前端

```
/client
  /src
    /components  # 通用组件
    /views       # 页面组件
    /stores      # Pinia 状态
    /api         # API 调用
    /types       # TypeScript 类型
    /utils       # 工具函数
```

---

## 项目初始化

**原则**：必须使用官方 CLI 工具初始化项目，禁止手动创建文件。

| 层级 | CLI 命令 | 说明 |
|------|----------|------|
| 前端 | `npm create vite@latest client -- --template vue-ts` | Vue3 + TypeScript 项目 |
| 后端 | `npm init` + 手动创建目录结构 | Node.js 模块初始化 |

**初始化后处理**：
1. 删除模板工程中的冗余文件（如默认的 HelloWorld 组件、示例文件等）
2. 保持项目骨架纯净，仅包含必要目录结构
