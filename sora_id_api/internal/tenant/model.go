package tenant

import "time"

type TenantStatus int

const (
	// Tenant đang hoạt động
	TenantActive TenantStatus = 1
	// Tenant ngừng hoạt động
	TenantDisable TenantStatus = 2
)

// tenant entity
type Tenant struct {
	// Khóa chính
	Id string `gorm:"primaryKey,column:Id"`
	// Tên tenant
	Name string `gorm:"column:Name"`
	// Trạng thái tenant
	Status TenantStatus `gorm:"column:Status"`
	// Thời gian tạo
	CreatedDate time.Time `gorm:"column:CreatedDate"`
	// Thời gian cập nhật
	UpdatedDate time.Time `gorm:"column:UpdatedDate"`
}

type Tabler interface {
	TableName() string
}

func (Tenant) TableName() string {
	return "SoraTenant"
}

// userTenant entity
type UserTenant struct {
	// User id
	UserId string `gorm:"column:UserId"`
	// TenantId
	TenantId string `gorm:"column:TenantId"`
}

func (UserTenant) TableName() string {
	return "SoraUserTenant"
}

type TenantDto struct {
	// Khóa chính
	Id string `json:"id"`
	// Tên
	Name string `json:"name"`
	// Trạng thái
	Status TenantStatus `json:"status"`
}

func MapToTenantDto(tenant Tenant) *TenantDto {
	return &TenantDto{
		Id:     tenant.Id,
		Name:   tenant.Name,
		Status: tenant.Status,
	}
}

// Req Dto tạo tenant
type CreateTenantReqDto struct {
	// Tên tenant
	Name string `json:"name"`
}
