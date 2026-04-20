package model

import (
	"time"

	"do-it-server/pkg/utils"
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
		t.ID = utils.NewUUID()
	}
	return nil
}
