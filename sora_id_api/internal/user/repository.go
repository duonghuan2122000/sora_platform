package user

import "soraidapi/internal/database"

type UserRepository interface {
	// Hàm lấy thông tin user bằng id
	GetById(id string) (*User, error)
}

type userRepo struct {
}

func NewUserRepository() UserRepository {
	return &userRepo{}
}

// Hàm lấy thông tin user bằng id
func (repo *userRepo) GetById(id string) (*User, error) {
	var user User
	if err := database.MysqlConnect.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
