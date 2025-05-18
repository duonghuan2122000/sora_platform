export interface ResponseBase<TDto> {
  // có thành công hay không?
  success: boolean;

  // mã lỗi
  code?: string;

  // mô tả lỗi
  message?: string;

  data?: TDto;
}

export interface TokenInfo {
  // user id
  userId: string;

  email: string;

  sessionId: string;
}
