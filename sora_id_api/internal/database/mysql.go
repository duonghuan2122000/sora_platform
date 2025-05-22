package database

import (
	"fmt"
	"sync"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	MysqlConnect *gorm.DB
	once         sync.Once
)

func InitMysql(dsn string) {
	once.Do(func() {
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			fmt.Printf("Lỗi kết nối tới database Mysql: %v", err)
		}

		MysqlConnect = db
	})
}
