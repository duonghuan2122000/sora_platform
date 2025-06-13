package files

import (
	"fmt"
	"io"
	"soraidapi/internal/base"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var fileSvc FileService

func InitHandler() {
	fileSvc = NewFileService()
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
	fmt.Println(formFile.Header.Get("Content-Type"))
	objectId := uuid.New().String()
	uploaded, _ := fileSvc.UploadFile(fileData, "sora-platform", objectId, &FileExtraData{
		ContentType:     formFile.Header.Get("Content-Type"),
		OrginalFileName: &formFile.Filename,
	})
	base.ToSuccessResponse(c, uploaded)
}
