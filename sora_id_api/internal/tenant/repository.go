package tenant

import (
	"soraidapi/internal/database"
	"time"
)

type TenantRepository interface {
	// Lấy tenant bằng id
	GetById(id string) (*Tenant, error)

	// Lấy danh sách Tenant bằng userId
	GetListByUserId(userId string) ([]Tenant, error)

	// Tạo tenant
	Create(tenant Tenant) (*Tenant, error)

	// Gắn user cho tenant
	AssignUserToTenant(tenantId string, userId string) error
}

type tenantRepo struct {
}

func NewTenantRepository() TenantRepository {
	return &tenantRepo{}
}

// Lấy tenant bằng id
func (repo *tenantRepo) GetById(id string) (*Tenant, error) {
	var tenant Tenant
	if err := database.MysqlConnect.Where("id = ?", id).First(&tenant).Error; err != nil {
		return nil, err
	}
	return &tenant, nil
}

// Lấy danh sách Tenant bằng userId
func (repo *tenantRepo) GetListByUserId(userId string) ([]Tenant, error) {
	var tenants []Tenant
	subQuery := database.MysqlConnect.Model(&UserTenant{}).Select("TenantId").Where("UserId = ?", userId)
	if err := database.MysqlConnect.Where("Id in (?)", subQuery).Find(&tenants).Error; err != nil {
		return nil, err
	}
	return tenants, nil
}

// Tạo tenant
func (repo *tenantRepo) Create(tenant Tenant) (*Tenant, error) {
	tenant.CreatedDate = time.Now().UTC()
	tenant.UpdatedDate = time.Now().UTC()
	if err := database.MysqlConnect.Create(&tenant).Error; err != nil {
		return nil, err
	}
	return &tenant, nil
}

// Gắn user cho tenant
func (repo *tenantRepo) AssignUserToTenant(tenantId string, userId string) error {
	userTenant := UserTenant{
		UserId:   userId,
		TenantId: tenantId,
	}

	return database.MysqlConnect.Create(&userTenant).Error
}
