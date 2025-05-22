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
