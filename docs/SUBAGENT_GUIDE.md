# Subagent 使用指南

本文档说明如何使用 subagent 进行并行开发。

---

## 核心概念

- **subagent**：独立的开发 agent，在独立上下文中工作
- **上下文文件**：`docs/PLAN.md` 和 `docs/STANDARDS.md` 是所有 subagent 共享的上下文
- **主 agent**：协调者，负责分配任务、审核结果、合并工作

---

## 工作流程

```
1. 主 agent 定义计划（PLAN.md）
2. 主 agent 创建 subagent 并行执行任务
3. subagent 返回结果
4. 主 agent 审核、合并
5. 重复直到完成
```

---

## 创建 subagent

使用 `Agent` 工具创建 subagent：

```markdown
Agent: feature-dev:code-architect（前端开发）
上下文：
  - docs/PLAN.md
  - docs/STANDARDS.md
职责：前端任务管理模块开发
阶段：Phase 2
```

---

## 阶段划分

| 阶段 | 说明 | 并行策略 |
|------|------|----------|
| Phase 1 | 项目初始化 + 接口定义 | 顺序（主 agent 执行） |
| Phase 2 | 基础框架（前后端并行） | 前端 + 后端 subagent |
| Phase 3 | 核心功能 | 按模块分配 |
| Phase 4 | 完善与测试 | 合并验证 |

---

## 上下文文件

| 文件 | 说明 |
|------|------|
| `docs/PLAN.md` | 项目计划、里程碑、接口协议 |
| `docs/STANDARDS.md` | 开发规范（TDD、代码风格、Git 规范） |

所有 subagent 在启动时会自动加载这些文件作为上下文。

---

## 注意事项

1. **接口先行**：Phase 1 必须先定义好 API 接口，再并行开发
2. **独立开发**：subagent 之间不应有依赖，通过接口通信
3. **审核合并**：主 agent 负责审核 subagent 的结果并合并
4. **保持同步**：subagent 返回后，可能需要同步最新进展到 PLAN.md
