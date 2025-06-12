package routes

import (
	"net/http"
	"soraidapi/internal/base"
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

	routerV1 := router.Group("/v1")
	routerV1.GET("/healthz", func(c *gin.Context) {
		base.ToSuccessResponse(c, "Thành công")
	})

	// user
	user.InitHandler()
	routerV1.GET("/users/me", base.AuthMiddleware(), user.GetCurrentUser)
	routerV1.POST("/users", user.Create)
	routerV1.POST("/session", user.GetSession)

}
