package user

import (
	"soraidapi/internal/database"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type GetUserAvatarObjectIdDto struct {
	AvatarS3ObjectId string
}

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

	// Hàm cập nhật avatar
	Update(id string, user User) (*User, error)

	// Hàm lấy thông tin avatar
	GetAvatarObjectId(id string) (*string, error)
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
	if err := database.MysqlConnect.Where("Username = ?", username).First(&user).Error; err != nil {
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

// Hàm cập nhật avatar
func (repo *userRepo) Update(id string, user User) (*User, error) {
	user.UpdatedDate = time.Now().UTC()
	if err := database.MysqlConnect.Model(&User{}).Where("Id = ?", id).Updates(user).Error; err != nil {
		return nil, err
	}
	return repo.GetById(id)
}

// Hàm lấy thông tin avatar
func (repo *userRepo) GetAvatarObjectId(id string) (*string, error) {
	var results GetUserAvatarObjectIdDto
	if err := database.MysqlConnect.Model(&User{}).Select("AvatarS3ObjectId").Where("id = ?", id).First(&results).Error; err != nil {
		return nil, err
	}
	return &results.AvatarS3ObjectId, nil
}
