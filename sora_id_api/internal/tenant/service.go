package tenant

import (
	"soraidapi/internal/base"

	"github.com/google/uuid"
)

type TenantService interface {
	// Hàm lấy danh sách Tenant từ userId hiện tại
	GetListByCurrentUser(userDto *base.UserDto) ([]TenantDto, error)

	// Hàm tạo tenant
	Create(payload CreateTenantReqDto, userDto *base.UserDto) (*TenantDto, error)
}

type tenantService struct {
	tenantRepo TenantRepository
}

func NewTenantService(tenantRepo TenantRepository) TenantService {
	return &tenantService{
		tenantRepo: tenantRepo,
	}
}

// Hàm lấy danh sách Tenant từ userId hiện tại
func (service *tenantService) GetListByCurrentUser(userDto *base.UserDto) ([]TenantDto, error) {
	tenants, err := service.tenantRepo.GetListByUserId(userDto.Id)
	if err != nil {
		return nil, err
	}
	tenantsDto := []TenantDto{}
	for _, t := range tenants {
		tenantsDto = append(tenantsDto, *MapToTenantDto(t))
	}
	return tenantsDto, nil
}

// Hàm tạo tenant
func (service *tenantService) Create(payload CreateTenantReqDto, userDto *base.UserDto) (*TenantDto, error) {
	newTenant := Tenant{
		Id:     uuid.New().String(),
		Name:   payload.Name,
		Status: TenantActive,
	}
	tenant, err := service.tenantRepo.Create(newTenant)
	if err != nil {
		return nil, err
	}
	service.tenantRepo.AssignUserToTenant(tenant.Id, userDto.Id)
	return MapToTenantDto(*tenant), nil
}
