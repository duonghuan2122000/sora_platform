/**
 * Http Client base
 * Sử dụng axios
 * CreatedBy: dbhuan
 */

import axios, { AxiosError, type AxiosRequestConfig } from "axios";

// Dto response base
export interface SoraResponseBase<TDto> {
  // cờ cho biết thành công hay thất bại
  success: boolean;
  // Mã lỗi
  errorCode?: string;
  // Mô tả lỗi
  errorMessage?: string;
  // data
  data?: TDto;
}

export class HttpClientBaseAPI {
  /**
   * Request base
   * CreatedBy: dbhuan
   */
  async requestAsync<TDto>(
    config: AxiosRequestConfig<any>
  ): Promise<SoraResponseBase<TDto>> {
    let result: SoraResponseBase<TDto> = {
      success: false,
    };

    try {
      config.withCredentials = true;
      let res = await axios(config);
      return res.data as SoraResponseBase<TDto>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          return axiosError.response.data as SoraResponseBase<TDto>;
        }
      }
      result.errorCode = "999";
      result.errorMessage = "Thất bại";
      return result;
    }
  }

  getBaseUrl() {
    return window._apis.baseUrl;
  }
}
