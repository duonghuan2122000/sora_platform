import {
  HttpClientBaseAPI,
  type SoraResponseBase,
} from "@/apis/base/httpClient";

interface LoginUserReqDto {
  // grant type
  grantType: string;
  // tên đăng nhập
  username: string;
  // mật khẩu
  password: string;
}

interface LoginUserDataResDto {
  // Id
  id: string;
  // tên đăng nhập
  username: string;
  // Tên
  firstName?: string;
  // Họ và tên đệm
  lastName?: string;
}

interface LoginUserResDto {
  // accessToken
  accessToken: string;
  // Thời gian hiệu lực
  expiresIn: number;
  // Loại token
  tokenType: string;
  // thông tin user
  user?: LoginUserDataResDto;
}

class UserAPI extends HttpClientBaseAPI {
  // thực hiện đăng nhập
  async login(
    payload: LoginUserReqDto
  ): Promise<SoraResponseBase<LoginUserResDto>> {
    const _this = this;
    let result = await _this.requestAsync<LoginUserResDto>({
      url: `${_this.getBaseUrl()}/users/login`,
      data: payload,
      method: "POST",
    });
    return result;
  }
}

const userAPI = new UserAPI();
export default userAPI;
