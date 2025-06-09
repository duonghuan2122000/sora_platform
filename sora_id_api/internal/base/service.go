package base

import (
	"crypto/rand"
	"encoding/base64"
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
func GetReferenceToken(accessToken string) string {
	return "Sora:Token:" + accessToken
}
