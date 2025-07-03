package routes

import (
	"net/http"
	"soraidapi/internal/base"
	"soraidapi/internal/files"
	"soraidapi/internal/tenant"
	"soraidapi/internal/user"

	"github.com/gin-gonic/gin"
	"github.com/unrolled/secure"
)

func SecurityMiddleware() gin.HandlerFunc {
	secureMiddleware := secure.New(secure.Options{
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "default-src 'self'; script-src 'self'",
		ReferrerPolicy:        "strict-origin-when-cross-origin",
		IsDevelopment:         false,
	})

	return func(c *gin.Context) {
		err := secureMiddleware.Process(c.Writer, c.Request)
		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.Next()
	}
}

func InitRoutes(router *gin.Engine) {
	router.Use(SecurityMiddleware())
	// user
	user.InitHandler()

	// tenant
	tenant.InitHandler()

	// file
	files.InitHandler()

	routerV1 := router.Group("/v1")
	routerV1.GET("/healthz", func(c *gin.Context) {
		base.ToSuccessResponse(c, "Thành công")
	})

	routerV1.GET("/users/me", base.AuthMiddleware(), user.GetCurrentUser)
	routerV1.POST("/users/avatar/change", base.AuthMiddleware(), user.UpdateAvatar)
	routerV1.POST("/users", user.Create)
	routerV1.GET("/users/me/avatar", base.AuthMiddleware(), user.GetAvatar)
	routerV1.POST("/users/login", user.Login)

	routerV1.POST("/files", files.UploadFile)
	routerV1.GET("/files/stream", files.StreamFile)

	routerV1.GET("/tenants/me", base.AuthMiddleware(), tenant.GetListByCurrentUser)
	routerV1.POST("/tenants", base.AuthMiddleware(), tenant.Create)
	routerV1.GET("/tenants/select", base.AuthMiddleware(), tenant.SelectTenantToWork)
}
