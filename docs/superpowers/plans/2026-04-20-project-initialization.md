# Project Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the project with Vue3 frontend and Go backend, remove template redundancies, configure CORS/dev proxy and SQLite connection.

**Architecture:** Two-phase initialization - first frontend (Vite CLI), then backend (go mod), followed by configuration of cross-origin and database concerns.

**Tech Stack:** Vue 3 + Vite + TypeScript, Go + Gin + GORM + SQLite

---

## File Structure (Post-Initialization)

```
/do-it
├── /client                    # Vue3 frontend (initialized via Vite CLI)
│   ├── /src
│   │   ├── /components        # (empty, ready for components)
│   │   ├── /views             # (empty, ready for pages)
│   │   ├── /stores            # (empty, ready for Pinia stores)
│   │   ├── /api               # (empty, ready for API calls)
│   │   ├── /types             # (empty, ready for TS types)
│   │   └── /utils             # (empty, ready for utilities)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── /server                    # Go backend
│   ├── /cmd
│   │   └── main.go
│   ├── /internal
│   │   ├── /handler
│   │   ├── /model
│   │   ├── /repository
│   │   └── /service
│   ├── /pkg
│   └── go.mod
└── docs/
```

---

## Task 1: Initialize Vue3 Frontend

**Files:**
- Create: `/Users/sunxianfeng/Desktop/n-true/do-it/client/*` (via Vite CLI)

- [ ] **Step 1: Run Vite CLI initialization**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it && npm create vite@latest client -- --template vue-ts`
Expected: Interactive prompts - confirm creation, select vue-ts template
Output: `/client` directory created with Vue3 + TypeScript project

- [ ] **Step 2: Verify project structure**

Run: `ls -la /Users/sunxianfeng/Desktop/n-true/do-it/client/`
Expected: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/` directory

- [ ] **Step 3: Install dependencies**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/client && npm install`
Expected: `node_modules/` created, `package-lock.json` generated

---

## Task 2: Clean Frontend Template Redundancies

**Files:**
- Delete: `client/src/components/HelloWorld.vue`
- Delete: `client/src/style.css` (if exists, remove default styles)
- Modify: `client/src/App.vue` (clear template, keep minimal structure)
- Modify: `client/src/main.ts` (keep minimal entry)

- [ ] **Step 1: Remove HelloWorld component**

Run: `rm /Users/sunxianfeng/Desktop/n-true/do-it/client/src/components/HelloWorld.vue`
Expected: File deleted

- [ ] **Step 2: Check and remove default style file**

Run: `ls /Users/sunxianfeng/Desktop/n-true/do-it/client/src/`
Expected: Check if `style.css` exists; if yes, remove it

- [ ] **Step 3: Clear App.vue**

Read: `client/src/App.vue`

Replace content with:
```vue
<script setup lang="ts">
// Minimal app shell - components will be added later
</script>

<template>
  <div id="app"></div>
</template>
```

- [ ] **Step 4: Verify App.vue is minimal**

Run: `cat /Users/sunxianfeng/Desktop/n-true/do-it/client/src/App.vue`
Expected: Contains only `<script setup>`, `<template>` with `<div id="app">`

- [ ] **Step 5: Commit**

```bash
cd /Users/sunxianfeng/Desktop/n-true/do-it
git add client/
git commit -m "chore: initialize Vue3 frontend with Vite + TypeScript"
```

---

## Task 3: Initialize Go Backend

**Files:**
- Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/` directory structure
- Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/go.mod`

- [ ] **Step 1: Create server directory structure**

Run:
```bash
mkdir -p /Users/sunxianfeng/Desktop/n-true/do-it/server/cmd
mkdir -p /Users/sunxianfeng/Desktop/n-true/do-it/server/internal/handler
mkdir -p /Users/sunxianfeng/Desktop/n-true/do-it/server/internal/model
mkdir -p /Users/sunxianfeng/Desktop/n-true/do-it/server/internal/repository
mkdir -p /Users/sunxianfeng/Desktop/n-true/do-it/server/internal/service
mkdir -p /Users/sunxianfeng/Desktop/n-true/do-it/server/pkg
```

Expected: Directory structure created

- [ ] **Step 2: Initialize Go module**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && go mod init do-it-server`
Expected: `go.mod` file created with `module do-it-server`

- [ ] **Step 3: Create minimal main.go**

Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/cmd/main.go`

```go
package main

import "fmt"

func main() {
	fmt.Println("Server initialized")
}
```

- [ ] **Step 4: Verify Go module builds**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && go build ./cmd/main.go`
Expected: Compiles successfully (or warning about empty main - that's OK for now)

- [ ] **Step 5: Commit**

```bash
git add server/
git commit -m "chore: initialize Go backend module"
```

---

## Task 4: Install Go Dependencies (Gin + GORM + SQLite)

**Files:**
- Modify: `/Users/sunxianfeng/Desktop/n-true/do-it/server/go.mod`

- [ ] **Step 1: Add Gin framework**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && go get github.com/gin-gonic/gin`
Expected: `gin` added to `go.mod`

- [ ] **Step 2: Add GORM with SQLite driver**

Run: `go get gorm.io/gorm && go get gorm.io/driver/sqlite`
Expected: `gorm` and `sqlite` drivers added to `go.mod`

- [ ] **Step 3: Add testify for testing**

Run: `go get github.com/stretchr/testify`
Expected: `testify` added to `go.mod`

- [ ] **Step 4: Verify go.mod**

Run: `cat /Users/sunxianfeng/Desktop/n-true/do-it/server/go.mod`
Expected: Contains `github.com/gin-gonic/gin`, `gorm.io/gorm`, `gorm.io/driver/sqlite`, `github.com/stretchr/testify`

- [ ] **Step 5: Commit**

```bash
git add server/go.mod server/go.sum
git commit -m "chore: add Gin, GORM, SQLite dependencies"
```

---

## Task 5: Configure CORS and Development Proxy

**Files:**
- Modify: `/Users/sunxianfeng/Desktop/n-true/do-it/server/cmd/main.go` (add CORS middleware)
- Modify: `/Users/sunxianfeng/Desktop/n-true/do-it/client/vite.config.ts` (add dev proxy)

- [ ] **Step 1: Add CORS middleware to main.go**

Read: `/Users/sunxianfeng/Desktop/n-true/do-it/server/cmd/main.go`

Replace content with:
```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS middleware - allow all origins for development
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	fmt.Println("Server running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
```

- [ ] **Step 2: Verify server starts without error**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && go build -o server ./cmd/main.go && timeout 3 ./server || true`
Expected: "Server running on http://localhost:8080" printed, process exits cleanly

- [ ] **Step 3: Configure Vite proxy**

Read: `/Users/sunxianfeng/Desktop/n-true/do-it/client/vite.config.ts`

Replace content with:
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

- [ ] **Step 4: Commit**

```bash
git add server/cmd/main.go client/vite.config.ts
git commit -m "feat: configure CORS and Vite dev proxy"
```

---

## Task 6: Configure SQLite Database Connection

**Files:**
- Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/internal/model/task.go`
- Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/internal/model/dimension.go`
- Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/pkg/database/database.go`
- Modify: `/Users/sunxianfeng/Desktop/n-true/do-it/server/cmd/main.go`

- [ ] **Step 1: Create database package**

Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/pkg/database/database.go`

```go
package database

import (
	"fmt"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init(dbPath string) error {
	// Ensure parent directory exists
	if err := os.MkdirAll(dbPath[:len(dbPath)-len("do-it.db")], 0755); err != nil {
		return fmt.Errorf("failed to create database directory: %w", err)
	}

	var err error
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	return nil
}

func GetDB() *gorm.DB {
	return DB
}
```

- [ ] **Step 2: Create Task model**

Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/internal/model/task.go`

```go
package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TaskStatus int

const (
	StatusTodo       TaskStatus = 0
	StatusInProgress TaskStatus = 1
	StatusDone       TaskStatus = 2
)

type Task struct {
	ID          string     `gorm:"primaryKey;type:varchar(36)" json:"id"`
	Title       string     `gorm:"type:varchar(255);not null" json:"title"`
	Description string     `gorm:"type:text" json:"description"`
	Status      TaskStatus `gorm:"type:integer;default:0" json:"status"`
	Deadline    *time.Time `gorm:"type:datetime" json:"deadline,omitempty"`
	BeginTime   *time.Time `gorm:"type:datetime" json:"beginTime,omitempty"`
	EndTime     *time.Time `gorm:"type:datetime" json:"endTime,omitempty"`
	CreatedAt   time.Time  `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time  `gorm:"autoUpdateTime" json:"updatedAt"`
}

func (t *Task) BeforeCreate(tx *gorm.DB) error {
	if t.ID == "" {
		t.ID = uuid.New().String()
	}
	return nil
}
```

- [ ] **Step 3: Create Dimension model**

Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/internal/model/dimension.go`

```go
package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Dimension struct {
	ID          string     `gorm:"primaryKey;type:varchar(36)" json:"id"`
	Code        string     `gorm:"type:varchar(64);uniqueIndex;not null" json:"code"`
	Title       string     `gorm:"type:varchar(255);not null" json:"title"`
	Description string     `gorm:"type:text" json:"description"`
	Creator     string     `gorm:"type:varchar(64)" json:"creator"`
	BeginTime   *time.Time `gorm:"type:datetime" json:"beginTime,omitempty"`
	EndTime     *time.Time `gorm:"type:datetime" json:"endTime,omitempty"`
	CreatedAt   time.Time  `gorm:"autoCreateTime" json:"createdAt"`
}

func (d *Dimension) BeforeCreate(tx *gorm.DB) error {
	if d.ID == "" {
		d.ID = uuid.New().String()
	}
	return nil
}
```

- [ ] **Step 4: Create TaskDimension relation model**

Create: `/Users/sunxianfeng/Desktop/n-true/do-it/server/internal/model/task_dimension.go`

```go
package model

type TaskDimension struct {
	TaskID      string `gorm:"primaryKey;type:varchar(36)" json:"taskId"`
	DimensionID string `gorm:"primaryKey;type:varchar(36)" json:"dimensionId"`
}
```

- [ ] **Step 5: Update main.go to initialize database**

Read: `/Users/sunxianfeng/Desktop/n-true/do-it/server/cmd/main.go`

Replace content with:
```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"do-it-server/internal/model"
	"do-it-server/pkg/database"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize SQLite database
	if err := database.Init("./data/do-it.db"); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Auto-migrate models
	if err := database.GetDB().AutoMigrate(&model.Task{}, &model.Dimension{}, &model.TaskDimension{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	fmt.Println("Server running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
```

- [ ] **Step 6: Add google/uuid dependency**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && go get github.com/google/uuid`
Expected: `uuid` added to `go.mod`

- [ ] **Step 7: Verify full build**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && go build -o server ./cmd/main.go && echo "Build successful"`
Expected: "Build successful" printed

- [ ] **Step 8: Commit**

```bash
git add server/
git commit -m "feat: configure SQLite database with auto-migration"
```

---

## Task 7: Final Verification

- [ ] **Step 1: Verify backend starts**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/server && timeout 3 ./server 2>&1 || true`
Expected: "Server running on http://localhost:8080" and no errors

- [ ] **Step 2: Verify frontend builds**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/client && npm run build`
Expected: `dist/` directory created, no TypeScript errors

- [ ] **Step 3: Verify frontend dev server starts**

Run: `cd /Users/sunxianfeng/Desktop/n-true/do-it/client && timeout 5 npm run dev 2>&1 || true`
Expected: "Local: http://localhost:5173" printed

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Initialize Vue3 frontend via Vite CLI |
| 2 | Clean frontend template redundancies |
| 3 | Initialize Go backend module and directory structure |
| 4 | Install Go dependencies (Gin, GORM, SQLite) |
| 5 | Configure CORS and Vite dev proxy |
| 6 | Configure SQLite database with models |
| 7 | Final verification |

**Plan complete.**