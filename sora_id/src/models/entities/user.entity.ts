import { Document } from "mongodb";

/**
 * Entity user
 */
export const USER_COLLECTION_NAME = "soraUser";

export interface UserEntity extends Document {
  // Id
  _id: string;

  // email
  email: string;

  // mật khẩu đã hash
  passwordHashed: string;

  // thời gian tạo
  createdDate: Date;

  // Thời gian cập nhật
  updatedDate: Date;
}
