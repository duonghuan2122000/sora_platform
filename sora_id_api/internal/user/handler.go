package user

import (
	"errors"
	"io"
	"soraidapi/config"
	"soraidapi/internal/base"
	sora_errors "soraidapi/internal/errors"
	"soraidapi/internal/files"

	"github.com/gin-gonic/gin"
)

var UserSvc UserService

func InitHandler() {
	userRepo := NewUserRepository()
	UserSvc = NewUserService(userRepo)
}

/*
Hàm xử lý lấy user bằng id

Mã lỗi:

- 999: Thất bại

CreatedBy: dbhuan
*/
func GetById(c *gin.Context) {
	id := c.Param("id")
	userDto, err := UserSvc.GetById(id)
	if err != nil {
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, userDto)
}

/*
Hàm xử lý tạo user

Mã lỗi:

- 400: Tham số không hợp lệ

- 999: Thất bại

- 001: Username đã tồn tại

CreatedBy: dbhuan
*/
func Create(c *gin.Context) {
	var payload CreateUserDto

	// Gắn JSON body vào struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}

	userDto, err := UserSvc.Create(payload)
	if err != nil {
		var logicErr *sora_errors.LogicError
		if errors.As(err, &logicErr) {
			base.ToErrorResponse(c, logicErr.Code, logicErr.Message)
			return
		}
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, userDto)
}

/*
Hàm xử lý lấy thông tin session hiện tại của người dùng

Mã lỗi:

- 400: Tham số không hợp lệ

- 999: Thất bại

- 001: Username không tồn tại

- 002: Mật khẩu không tồn tại

- 501: Không hỗ trợ
*/
func GetSession(c *gin.Context) {
	var payload GetUserSessionReqDto

	// Gắn JSON body vào struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		base.ToErrorResponse(c, "400", "Tham số không hợp lệ")
		return
	}

	result, err := UserSvc.GetSession(payload)
	if err != nil {
		var logicErr *sora_errors.LogicError
		if errors.As(err, &logicErr) {
			base.ToErrorResponse(c, logicErr.Code, logicErr.Message)
			return
		}
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	c.SetCookie(base.AccessTokenCookieName, result.AccessToken, result.ExpiresIn, "/", "", false, true)
	base.ToSuccessResponse(c, result)
}

/*
Lấy thông tin user hiện tại

# Cần auth

# Mã lỗi

- 401: Unauth

- 999: Thất bại
*/
func GetCurrentUser(c *gin.Context) {
	userDto := base.GetCurrentUser(c)
	base.ToSuccessResponse(c, userDto)
}

func UpdateAvatar(c *gin.Context) {
	userDto := base.GetCurrentUser(c)
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
	fileInfo := files.FileInfoDto{
		FileData: fileData,
		ExtraData: &files.FileExtraData{
			ContentType:     formFile.Header.Get("Content-Type"),
			OrginalFileName: &formFile.Filename,
		},
	}
	payload := UpdateUserAvatarReqDto{
		User:     *userDto,
		FileInfo: fileInfo,
		BaseUrl:  config.AppConfig.BaseUrl,
	}
	urlStreamFile, err := UserSvc.UpdateAvatar(payload)
	if err != nil {
		var logicErr *sora_errors.LogicError
		if errors.As(err, &logicErr) {
			base.ToErrorResponse(c, logicErr.Code, logicErr.Message)
			return
		}
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, urlStreamFile)
}

/*
Hàm lấy thông tin avatar của user hiện tại

Mã lỗi:

- 401: Unauth

- 999: Thất bại
*/
func GetAvatar(c *gin.Context) {
	userDto := base.GetCurrentUser(c)
	avatarS3ObjectId, err := UserSvc.GetAvatar(userDto)
	if err != nil {
		var logicErr *sora_errors.LogicError
		if errors.As(err, &logicErr) {
			base.ToErrorResponse(c, logicErr.Code, logicErr.Message)
			return
		}
		base.ToErrorResponse(c, "999", "Thất bại")
		return
	}
	base.ToSuccessResponse(c, config.AppConfig.BaseUrl+"/v1/files/stream?bucketName=sora-platform&objectId="+*avatarS3ObjectId)
}
