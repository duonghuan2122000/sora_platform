package main

import (
	"soraidapi/config"
	"soraidapi/internal/database"
	"soraidapi/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load cấu hình từ file
	config.LoadConfig(".")
	database.InitMysql(config.AppConfig.MysqlConnectionString)
	router := gin.Default()
	router.SetTrustedProxies(config.AppConfig.TrustProxies)
	routes.InitRoutes(router)
	router.Run(config.AppConfig.HostName + ":" + config.AppConfig.AppPort)
}
