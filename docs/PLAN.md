# 任务事项管理 App (PC Web)

## 开发指南

所有 subagent 开发前请阅读：

1. [docs/SUBAGENT_GUIDE.md](docs/SUBAGENT_GUIDE.md) - subagent 使用说明
2. [docs/STANDARDS.md](docs/STANDARDS.md) - 开发规范（TDD、代码风格、Git 规范）

---

## Context

用户想做一个前后端分离的全栈应用，核心是任务事项管理。PC Web 先做，移动端后续考虑。不需要用户系统，数据本地存储/单设备使用。

技术栈已确定：前端 Vue3 + Vite + TS + Vitest，后端 Node.js + Express + SQLite。

## 核心模块

1. **日历视图** - 显示任务时间和期限
2. **任务管理** - CRUD（添加、修改、完成、删除任务）
3. **维度管理** - 带时间范围的多信息标签系统
4. **检索系统** - 按维度、任务信息、日期等条件检索

---

## 技术架构

### 前端 (Vue3)
- 框架：Vue 3 + Composition API + TypeScript
- 构建：Vite
- 测试：Vitest
- 路由：Vue Router
- 状态：Pinia（轻量）
- UI 组件：待定（可考虑 Element Plus / Ant Design Vue / Naive UI）

### 后端 (Node.js)
- HTTP 框架：Express（简洁灵活）
- 数据库：SQLite（单设备，无需 MySQL/PostgreSQL）
- ORM：better-sqlite3（轻量，直接 SQL）
- API 风格：RESTful JSON

### 目录结构
```
/client          # Vue3 前端
  /src
    /components  # 组件
    /views       # 页面
    /stores      # Pinia 状态
    /api         # API 调用
    /types       # TS 类型
/server          # Node.js 后端
  /src
    /routes      # 路由
    /controllers # 控制器
    /models      # 数据模型
    /middleware  # 中间件
    /utils       # 工具函数
```

---

## 数据模型设计

### Task (任务)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (UUID) | 主键 |
| title | string | 任务标题 |
| description | string | 任务描述 |
| status | int | 0=待办 1=进行中 2=已完成 |
| deadline | datetime | 截止时间（可选） |
| beginTime | datetime | 开始时间（可选） |
| endTime | datetime | 结束时间（可选） |
| createdAt | datetime | 创建时间 |
| updatedAt | datetime | 更新时间 |

### Dimension (维度)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (UUID) | 主键 |
| code | string | 维度标识（唯一） |
| title | string | 维度标题 |
| description | string | 维度描述 |
| createTime | datetime | 创建时间 |
| createUser | string | 创建人 |
| beginTime | datetime | 生效开始时间 |
| endTime | datetime | 生效结束时间（null=永久有效） |

**业务规则**：维度只在 `[beginTime, endTime)` 时间范围内才能与任务关联。endTime 为空表示永久有效。

### TaskDimension (任务-维度关联)
| 字段 | 类型 | 说明 |
|------|------|------|
| taskId | string | 任务 ID |
| dimensionId | string | 维度 ID |

---

## API 设计

### 任务
- `GET    /api/tasks` - 获取任务列表（支持筛选）
- `GET    /api/tasks/:id` - 获取单个任务
- `POST   /api/tasks` - 创建任务
- `PUT    /api/tasks/:id` - 更新任务
- `DELETE /api/tasks/:id` - 删除任务
- `PATCH  /api/tasks/:id/status` - 更新任务状态

### 维度
- `GET    /api/dimensions` - 获取维度列表
- `GET    /api/dimensions/:id` - 获取单个维度
- `POST   /api/dimensions` - 创建维度
- `PUT    /api/dimensions/:id` - 更新维度
- `DELETE /api/dimensions/:id` - 删除维度

### 检索
- `GET    /api/tasks/search` - 高级检索（支持按维度、时间、关键词）

### 任务-维度关联
- `POST   /api/tasks/:id/dimensions` - 关联维度（校验时间范围）
- `DELETE /api/tasks/:id/dimensions/:dimId` - 解除关联

---

## 页面设计

1. **日历页面** - 日/周/月视图，任务时间可视化
2. **任务列表页** - 任务 CRUD，支持筛选和搜索
3. **维度管理页** - 维度 CRUD
4. **检索页** - 组合条件检索任务

---

## 实施计划

### Phase 1: 项目初始化
- [x] 初始化 Vue3 前端项目 (Vite + TS) - 使用 `npm create vite@latest client -- --template vue-ts`
- [x] 初始化 Node.js 后端项目 - 使用 `npm init`
- [x] 删除模板工程中的冗余文件
- [x] 配置 CORS 和开发代理
- [x] 配置 SQLite 数据库连接

### Phase 2: 基础框架
- [ ] 实现数据模型和数据库迁移
- [ ] 实现任务的基础 CRUD API
- [ ] 实现维度的基础 CRUD API
- [ ] 前端：搭建页面路由和布局

### Phase 3: 核心功能
- [ ] 日历组件开发
- [ ] 任务与维度关联功能
- [ ] 高级检索功能

### Phase 4: 完善与测试
- [ ] Vitest 单元测试
- [ ] API 接口测试
- [ ] 页面交互优化

---

## 验证方案

1. **后端**：启动 server，运行 `curl http://localhost:8080/api/tasks` 验证 API
2. **前端**：启动 dev server，访问 `http://localhost:5173` 验证页面渲染
3. **完整流程**：创建维度 → 创建任务并关联维度 → 日历查看 → 检索验证
