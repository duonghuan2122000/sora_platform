package base

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// Hàm tạo response thành công
func ToSuccessResponse(c *gin.Context, data any) {
	c.JSON(http.StatusOK, &ResponseBase{
		Success: true,
		Data:    data,
	})
}

// Hàm tạo response thất bại,
func ToErrorResponse(c *gin.Context, errorCode string, errorMessage string) {
	c.AbortWithStatusJSON(http.StatusOK, &ResponseBase{
		Success:      false,
		ErrorCode:    errorCode,
		ErrorMessage: errorMessage,
	})
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		accessToken, err := c.Cookie(AccessTokenCookieName)
		if err != nil {
			accessTokenHeader := c.GetHeader("Authorization")
			if len(accessTokenHeader) <= 0 {
				ToErrorResponse(c, "401", "Unauthorized")
				return
			}
			accessTokenSplit := strings.Split(accessTokenHeader, " ")
			if len(accessTokenSplit) != 2 || len(accessTokenSplit[0]) <= 0 || strings.ToLower(accessTokenSplit[0]) != "bearer" || len(accessTokenSplit[1]) <= 0 {
				ToErrorResponse(c, "401", "Unauthorized")
				return
			}
			accessToken = accessTokenSplit[1]
		}

		userDto := GetReferenceToken(accessToken)
		if userDto == nil {
			ToErrorResponse(c, "401", "Unauthorized")
			return
		}
		c.Set(CurrentUserVarKey, userDto)
		c.Next()
	}
}

func GetCurrentUser(c *gin.Context) *UserDto {
	userDtoObj, exists := c.Get(CurrentUserVarKey)
	if !exists {
		ToErrorResponse(c, "401", "Unauthorized")
		return nil
	}
	userDto, ok := userDtoObj.(*UserDto)
	if !ok {
		ToErrorResponse(c, "401", "Unauthorized")
		return nil
	}
	return userDto
}
