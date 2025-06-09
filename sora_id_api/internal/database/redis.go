package database

import (
	"context"
	"fmt"
	"sync"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

var (
	Rdb     *redis.Client
	rdbOnce sync.Once
)

func InitRedis(addr string, pass string, db int) {
	rdbOnce.Do(func() {
		Rdb = redis.NewClient(&redis.Options{
			Addr:     addr,
			Password: pass,
			DB:       db,
		})

		fmt.Println(Rdb)

		_, err := Rdb.Ping(ctx).Result()
		if err != nil {
			panic(err)
		}
	})
}
