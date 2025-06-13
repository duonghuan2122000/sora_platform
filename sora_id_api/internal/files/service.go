package files

import (
	"bytes"
	"context"
	"soraidapi/internal/database"

	"github.com/minio/minio-go/v7"
)

type FileService interface {
	// Upload file
	UploadFile(fileData []byte, bucketName string, objectId string, extraData *FileExtraData) (bool, error)
}

type fileService struct {
}

func NewFileService() FileService {
	return &fileService{}
}

// Upload file
func (fileSvc *fileService) UploadFile(fileData []byte, bucketName string, objectId string, extraData *FileExtraData) (bool, error) {
	exists, err := database.S3Storage.BucketExists(context.Background(), bucketName)
	if err != nil {
		return false, err
	}
	if !exists {
		err = database.S3Storage.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})
		if err != nil {
			return false, err
		}
	}

	buffer := bytes.NewBuffer(fileData)

	contentType := "application/octet-stream"
	if len(extraData.ContentType) >= 0 {
		contentType = extraData.ContentType
	}

	userMetadata := map[string]string{}
	if extraData.OrginalFileName != nil && len(*extraData.OrginalFileName) > 0 {
		userMetadata["Orginal-FileName"] = *extraData.OrginalFileName
	}

	// upload file buffer
	_, err = database.S3Storage.PutObject(
		context.Background(),
		bucketName,
		objectId,
		buffer,
		int64(buffer.Len()),
		minio.PutObjectOptions{
			ContentType:  contentType,
			UserMetadata: userMetadata,
		},
	)
	if err != nil {
		return false, err
	}
	return true, nil
}
