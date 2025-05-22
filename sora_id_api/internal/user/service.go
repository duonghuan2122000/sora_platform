package user

type UserService interface {
	// Hàm lấy thông tin user bằng id
	GetById(id string) (*UserDto, error)
}

type userService struct {
	userRepo UserRepository
}

func NewUserService(userRepo UserRepository) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

func mapUserToUserDto(user *User) *UserDto {
	return &UserDto{
		Id:        user.Id,
		Username:  user.Username,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}
}

func (service *userService) GetById(id string) (*UserDto, error) {
	user, err := service.userRepo.GetById(id)
	if err != nil {
		return nil, err
	}
	return mapUserToUserDto(user), err
}
