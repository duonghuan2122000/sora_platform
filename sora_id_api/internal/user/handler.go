package user

import (
	"soraidapi/internal/base"

	"github.com/gin-gonic/gin"
)

var userSvc UserService

func InitHandler() {
	userRepo := NewUserRepository()
	userSvc = NewUserService(userRepo)
}

func GetById(c *gin.Context) {
	id := c.Param("id")
	userDto, err := userSvc.GetById(id)
	if err != nil {
		base.ToErrorResponse(c, "001", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, userDto)
}
