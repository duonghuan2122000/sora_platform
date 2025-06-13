package files

import (
	"bytes"
	"context"
	"io"
	"soraidapi/internal/database"

	"github.com/minio/minio-go/v7"
)

type FileService interface {
	// Upload file
	UploadFile(fileData []byte, bucketName string, objectId string, extraData *FileExtraData) (bool, error)

	// Stream File
	StreamFile(bucketName string, objectId string) (*FileInfoDto, error)
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

// Stream File
func (fileSvc *fileService) StreamFile(bucketName string, objectId string) (*FileInfoDto, error) {
	minObj, err := database.S3Storage.GetObject(context.Background(), bucketName, objectId, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}
	defer minObj.Close()

	buf := new(bytes.Buffer)
	_, err = io.Copy(buf, minObj)
	if err != nil {
		return nil, err
	}
	stat, err := database.S3Storage.StatObject(context.Background(), bucketName, objectId, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}
	extraData := &FileExtraData{
		ContentType: stat.ContentType,
	}
	if disp, ok := stat.UserMetadata["X-Amz-Meta-Orginal-Filename"]; ok {
		extraData.OrginalFileName = &disp
	}
	result := &FileInfoDto{
		FileData:  buf.Bytes(),
		ExtraData: extraData,
	}
	return result, nil
}
