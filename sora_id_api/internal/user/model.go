package user

import (
	"soraidapi/internal/base"
	"soraidapi/internal/files"
	"time"
)

// user entity
type User struct {
	// Khóa chính
	Id string `gorm:"primaryKey;column:Id"`
	// Tên đăng nhập
	Username string `gorm:"index;column:Username"`
	// Tên
	FirstName *string `gorm:"column:FirstName"`
	// Họ và tên đệm
	LastName *string `gorm:"column:LastName"`
	// Mật khẩu đã hash
	PasswordHashed *string `gorm:"column:PasswordHashed"`
	// Thời gian tạo
	CreatedDate time.Time `gorm:"column:CreatedDate"`
	// Thời gian cập nhật
	UpdatedDate time.Time `gorm:"column:UpdatedDate"`
	// ObjectId S3 cho Avatar
	AvatarS3ObjectId string `gorm:"column:AvatarS3ObjectId"`
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "SoraUser"
}

// Dto tạo user
type CreateUserDto struct {
	// Tên đăng nhập
	Username string `json:"username"`

	// Tên
	FirstName string `json:"firstName"`

	// Họ và tên đệm
	LastName string `json:"lastName"`

	// Mật khẩu
	Password string `json:"password"`
}

// Dto lấy thông tin session của người dùng
type GetUserSessionReqDto struct {
	// Loại grant
	GrantType string `json:"grantType"`
	// Tên đăng nhập
	Username string `json:"username"`
	// Mật khẩu
	Password string `json:"password"`
}

// Dto res lấy thông tin session của người dùng
type GetUserSessionResDto struct {
	// Access token
	AccessToken string `json:"accessToken"`
	// Loại token
	TokenType string `json:"tokenType"`
	// Thời gian hiệu lực
	ExpiresIn int `json:"expiresIn"`
	// Thông tin user
	User base.UserDto `json:"user"`
}

type GetUserSessionGrantType string

const (
	GrantTypePassword GetUserSessionGrantType = "password"
)

// Dto req cập nhật avatar
type UpdateUserAvatarReqDto struct {
	// Thông tin file
	FileInfo files.FileInfoDto
	// Thông tin user
	User base.UserDto
	// base url của app
	BaseUrl string
}
