package routes

import (
	"soraidapi/internal/base"
	"soraidapi/internal/user"

	"github.com/gin-gonic/gin"
)

func InitRoutes(router *gin.Engine) {
	routerV1 := router.Group("/v1")
	routerV1.GET("/healthz", func(c *gin.Context) {
		base.ToSuccessResponse(c, "Thành công")
	})

	// user
	user.InitHandler()
	routerV1.GET("/users/:id", user.GetById)
}
