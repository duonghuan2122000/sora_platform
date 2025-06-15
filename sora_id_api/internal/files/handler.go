package files

import (
	"fmt"
	"io"
	"net/http"
	"soraidapi/internal/base"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var FileSvc FileService

func InitHandler() {
	FileSvc = NewFileService()
}

func UploadFile(c *gin.Context) {
	formFile, err := c.FormFile("file")
	if err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}
	file, err := formFile.Open()
	if err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}
	defer file.Close()

	fileData, err := io.ReadAll(file)
	if err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}
	objectId := uuid.New().String()
	uploaded, _ := FileSvc.UploadFile(fileData, "sora-platform", objectId, &FileExtraData{
		ContentType:     formFile.Header.Get("Content-Type"),
		OrginalFileName: &formFile.Filename,
	})
	base.ToSuccessResponse(c, uploaded)
}

func StreamFile(c *gin.Context) {
	bucketName := c.Query("bucketName")
	objectId := c.Query("objectId")

	fileInfo, err := FileSvc.StreamFile(bucketName, objectId)
	if err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}
	if fileInfo.ExtraData != nil && fileInfo.ExtraData.OrginalFileName != nil {
		c.Header("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, *fileInfo.ExtraData.OrginalFileName))
	}
	c.Data(http.StatusOK, fileInfo.ExtraData.ContentType, fileInfo.FileData)
}
