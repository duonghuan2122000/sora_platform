package routes

import (
	"gin/internal/base"

	"github.com/gin-gonic/gin"
)

func InitRoutes(router *gin.Engine) {
	routerV1 := router.Group("/v1")
	routerV1.GET("/healthz", func(c *gin.Context) {
		base.ToSuccessResponse(c, "Thành công")
	})
}
