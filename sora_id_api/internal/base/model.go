package base

type ResponseBase struct {
	// Cờ đánh dấu có thành công không
	Success bool `json:"success" binding:"required"`

	// Mã lỗi (chỉ có giá trị khi thất bại)
	ErrorCode string `json:"errorCode,omitempty"`

	// Mô tả mã lỗi
	ErrorMessage string `json:"errorMessage,omitempty"`

	// Data (chỉ có giá trị khi thành công)
	Data any `json:"data,omitempty"`
}

const (
	AccessTokenCookieName = "x-sora-access-token"

	CurrentUserVarKey = "Sora:CurrentUser"

	TenantIdCookieName = "x-sora-tenant-id"
)

type UserDto struct {
	// Khóa chính
	Id string `json:"id"`

	// Tên đăng nhập
	Username string `json:"username"`

	// Tên
	FirstName string `json:"firstName"`

	// Họ và tên đệm
	LastName string `json:"lastName"`
}
