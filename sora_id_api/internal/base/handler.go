package base

import (
	"net/http"

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
