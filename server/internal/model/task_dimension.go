package model

type TaskDimension struct {
	TaskID      string `gorm:"primaryKey;type:varchar(36)" json:"taskId"`
	DimensionID string `gorm:"primaryKey;type:varchar(36)" json:"dimensionId"`
}
