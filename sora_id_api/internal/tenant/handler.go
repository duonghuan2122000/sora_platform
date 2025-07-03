package tenant

import (
	"errors"
	"soraidapi/internal/base"
	sora_errors "soraidapi/internal/errors"

	"github.com/gin-gonic/gin"
)

var TenantSvc TenantService

func InitHandler() {
	tenantRepo := NewTenantRepository()
	TenantSvc = NewTenantService(tenantRepo)
}

/*
Hàm xử lý lấy danh sách tenant của user hiện tại
*/
func GetListByCurrentUser(c *gin.Context) {
	userDto := base.GetCurrentUser(c)
	tenants, err := TenantSvc.GetListByCurrentUser(userDto)
	if err != nil {
		var logicErr *sora_errors.LogicError
		if errors.As(err, &logicErr) {
			base.ToErrorResponse(c, logicErr.Code, logicErr.Message)
			return
		}
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, tenants)
}

/*
Hàm xử lý tạo tenant mới
*/
func Create(c *gin.Context) {
	var payload CreateTenantReqDto

	// Gắn JSON body vào struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}
	userDto := base.GetCurrentUser(c)
	tenantDto, err := TenantSvc.Create(payload, userDto)
	if err != nil {
		var logicErr *sora_errors.LogicError
		if errors.As(err, &logicErr) {
			base.ToErrorResponse(c, logicErr.Code, logicErr.Message)
			return
		}
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, tenantDto)
}

/*
Hàm xử lý chọn tenant muốn làm việc
*/
func SelectTenantToWork(c *gin.Context) {
	tenantId := c.Query("tenantId")

	c.SetCookie(base.TenantIdCookieName, tenantId, 86400, "/", "", false, true)
	base.ToSuccessResponse(c, true)
}
