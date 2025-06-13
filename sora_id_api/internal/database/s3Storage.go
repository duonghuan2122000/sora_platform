package database

import (
	"sync"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var (
	S3Storage *minio.Client
	s3Once    sync.Once
)

func InitS3Storage(endpoint string, accessKey string, secretKey string, useSsl bool) {
	s3Once.Do(func() {
		var err error
		S3Storage, err = minio.New(endpoint, &minio.Options{
			Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
			Secure: useSsl,
		})
		if err != nil {
			panic(err)
		}
	})
}
