import SoraInput from "@/components/buttons/inputs/SoraInput";
import SoraButton from "@/components/buttons/SoraButton";

/**
 * Màn hình đăng nhập
 */
const LoginPage = () => {
  return (
    <div class="col-12 p-3 col-sm-6 offset-sm-3 col-xl-4 offset-xl-4">
      <div class="card">
        <div class="card-body">
          <div class="h5">Đăng nhập</div>
          <hr />
          <div class="mb-3">
            <SoraInput type="text" label="Email" autoFocus={true} />
          </div>
          <div class="mb-3">
            <SoraInput type="text" label="Mật khẩu" />
          </div>
          <div>
            <SoraButton text="Đăng nhập" type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
