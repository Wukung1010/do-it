package model

import (
	"time"

	"do-it-server/pkg/utils"
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
		d.ID = utils.NewUUID()
	}
	return nil
}
