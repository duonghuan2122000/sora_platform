package user

import (
	"context"
	"encoding/json"
	"soraidapi/internal/base"
	"soraidapi/internal/database"
	sora_errors "soraidapi/internal/errors"
	"time"
)

type UserService interface {
	// Hàm lấy thông tin user bằng id
	GetById(id string) (*base.UserDto, error)

	// Tạo user
	Create(createUserDto CreateUserDto) (*base.UserDto, error)

	// Thực hiện lấy session hiện tại của người dùng
	GetSession(payload GetUserSessionReqDto) (*GetUserSessionResDto, error)

	// Lấy thông tin user hiện tại
	GetCurrentUser(userDto *base.UserDto) (*base.UserDto, error)
}

type userService struct {
	userRepo UserRepository
}

func NewUserService(userRepo UserRepository) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

func mapUserToUserDto(user *User) *base.UserDto {
	return &base.UserDto{
		Id:        user.Id,
		Username:  user.Username,
		FirstName: *user.FirstName,
		LastName:  *user.LastName,
	}
}

func (service *userService) GetById(id string) (*base.UserDto, error) {
	user, err := service.userRepo.GetById(id)
	if err != nil {
		return nil, err
	}
	return mapUserToUserDto(user), err
}

// Tạo user
func (service *userService) Create(createUserDto CreateUserDto) (*base.UserDto, error) {
	// kiểm tra username đã tồn tại chưa?
	user, _ := service.userRepo.GetByUsername(createUserDto.Username)

	if user != nil {
		return nil, &sora_errors.LogicError{
			Code:    "001",
			Message: "Username đã tồn tại",
		}
	}

	newUser := User{
		Username:  createUserDto.Username,
		FirstName: &createUserDto.FirstName,
		LastName:  &createUserDto.LastName,
	}
	newUser.PasswordHashed = service.userRepo.HashPassword(createUserDto.Password)

	user, err := service.userRepo.Create(newUser)
	if err != nil {
		return nil, err
	}
	return mapUserToUserDto(user), err
}

// Thực hiện lấy session hiện tại của người dùng
func (service *userService) GetSession(payload GetUserSessionReqDto) (*GetUserSessionResDto, error) {
	switch payload.GrantType {
	case string(GrantTypePassword):
		user, err := service.userRepo.GetByUsername(payload.Username)
		if err != nil {
			return nil, &sora_errors.LogicError{
				Code:    "001",
				Message: "Username không tồn tại",
			}
		}
		validPassword := service.userRepo.VerifyPassword(payload.Password, *user.PasswordHashed)
		if !validPassword {
			return nil, &sora_errors.LogicError{
				Code:    "002",
				Message: "Mật khẩu không hợp lệ",
			}
		}
		accessToken, _ := base.GenerateReferenceToken()
		userDto := mapUserToUserDto(user)
		userDtoStr, _ := json.Marshal(userDto)
		expiresIn := 3600
		database.Rdb.Set(context.Background(), base.GetReferenceTokenKey(accessToken), string(userDtoStr), time.Duration(expiresIn)*time.Second)
		result := &GetUserSessionResDto{
			AccessToken: accessToken,
			TokenType:   "Bearer",
			ExpiresIn:   3600,
			User:        *userDto,
		}
		return result, nil
	default:
		return nil, &sora_errors.LogicError{
			Code:    "501",
			Message: "Không hỗ trợ",
		}
	}
}

// Lấy thông tin user hiện tại
func (service *userService) GetCurrentUser(userDto *base.UserDto) (*base.UserDto, error) {
	return userDto, nil
}
