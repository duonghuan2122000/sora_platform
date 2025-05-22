package user

import "time"

// user entity
type User struct {
	// Khóa chính
	Id string `gorm:"primaryKey"`
	// Tên đăng nhập
	Username string `gorm:"index"`
	// Tên
	FirstName string
	// Họ và tên đệm
	LastName string
	// Mật khẩu đã hash
	PasswordHashed string
	// Thời gian tạo
	CreatedDate time.Time
	// Thời gian cập nhật
	UpdatedDate time.Time
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "SoraUser"
}

type UserDto struct {
	// Khóa chính
	Id string `json:"id"`

	// Tên đăng nhập
	Username string `json:"username"`

	// Tên
	FirstName string `json:"firstName"`

	// Họ và tên đệm
	LastName string `json:"lastName"`
}
