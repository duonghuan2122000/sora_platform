package user

import (
	"soraidapi/internal/database"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserRepository interface {
	// Hàm lấy thông tin user bằng id
	GetById(id string) (*User, error)

	// Hàm lấy thông tin user bằng username
	GetByUsername(username string) (*User, error)

	// Tạo user
	Create(user User) (*User, error)

	// Hàm xử lý mã hóa mật khẩu
	HashPassword(password string) *string

	// Hàm kiểm tra mật khẩu có hợp lệ
	VerifyPassword(password string, passwordHashed string) bool
}

type userRepo struct {
}

func NewUserRepository() UserRepository {
	return &userRepo{}
}

// Hàm xử lý mã hóa mật khẩu
func (repo *userRepo) HashPassword(password string) *string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil
	}
	result := string(hashedPassword)
	return &result
}

// Hàm lấy thông tin user bằng id
func (repo *userRepo) GetById(id string) (*User, error) {
	var user User
	if err := database.MysqlConnect.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// Hàm lấy thông tin user bằng username
func (repo *userRepo) GetByUsername(username string) (*User, error) {
	var user User
	if err := database.MysqlConnect.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// Tạo user
func (repo *userRepo) Create(user User) (*User, error) {
	user.Id = uuid.New().String()
	user.CreatedDate = time.Now().UTC()
	user.UpdatedDate = time.Now().UTC()
	if err := database.MysqlConnect.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// Hàm kiểm tra mật khẩu có hợp lệ
func (repo *userRepo) VerifyPassword(password string, passwordHashed string) bool {
	return bcrypt.CompareHashAndPassword([]byte(passwordHashed), []byte(password)) == nil
}
