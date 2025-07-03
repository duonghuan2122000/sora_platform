import {
  HttpClientBaseAPI,
  type SoraResponseBase,
} from "@/apis/base/httpClient";

const TenantStatusConst = {
  // Đang hoạt động
  Active: 1,
  // Ngừng hoạt động
  Disable: 2,
};

type TenantStatus = (typeof TenantStatusConst)[keyof typeof TenantStatusConst];

export interface TenantDto {
  // khóa chính
  id: string;
  // tên
  name: string;
  // trạng thái
  status: TenantStatus;
}

class TenantAPI extends HttpClientBaseAPI {
  /**
   * Lấy danh sách tenant mà user hiện tại đang thuộc về
   */
  async getListByCurrentUser(): Promise<SoraResponseBase<TenantDto[]>> {
    const _this = this;
    let result = await _this.requestAsync<TenantDto[]>({
      url: `${_this.getBaseUrl()}/tenants/me`,
      method: "GET",
    });
    return result;
  }

  /**
   * Chọn tenant
   */
  async selectTenantToWork(
    tenantId: string
  ): Promise<SoraResponseBase<boolean>> {
    const _this = this;
    let result = await _this.requestAsync<boolean>({
      url: `${_this.getBaseUrl()}/tenants/select?tenantId=${tenantId}`,
      method: "GET",
    });
    return result;
  }
}

const tenantAPI = new TenantAPI();
export default tenantAPI;
