package files

type FileExtraData struct {
	// Content-Type
	ContentType string

	// Original filename
	OrginalFileName *string
}

type FileInfoDto struct {
	// Nội dung file
	FileData []byte

	// Thông tin bổ sung
	ExtraData *FileExtraData
}
