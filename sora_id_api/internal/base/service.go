package base

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"soraidapi/internal/database"

	"github.com/redis/go-redis/v9"
)

// Hàm tạo reference token
func GenerateReferenceToken() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

// Hàm tạo key redis cho reference token
func GetReferenceTokenKey(accessToken string) string {
	return "Sora:Token:" + accessToken
}

// Hàm lấy thông tin reference token
func GetReferenceToken(accessToken string) *UserDto {
	val, err := database.Rdb.Get(context.Background(), GetReferenceTokenKey(accessToken)).Result()
	if err == redis.Nil {
		return nil
	}

	if err != nil {
		return nil
	}

	var userDto UserDto
	err = json.Unmarshal([]byte(val), &userDto)
	if err != nil {
		return nil
	}
	return &userDto
}
