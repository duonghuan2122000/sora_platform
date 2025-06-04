import SoraInput from "@/components/inputs/SoraInput";
import SoraButton from "@/components/buttons/SoraButton";
import { useLoginValidation } from "@/validations/login.validation";

/**
 * Màn hình đăng nhập
 */
const LoginPage = () => {
  const { loginData, setLoginData, errorMessage, validate } =
    useLoginValidation();

  /**
   * Sự kiện submit form
   * @param e Submit event - Sự kiện khi submit form
   */
  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();
    await validate();
  };

  return (
    <div class="col-12 p-3 col-sm-6 offset-sm-3 col-xl-4 offset-xl-4">
      <form action="" on:submit={(e) => handleLogin(e)}>
        <div class="card">
          <div class="card-body">
            <div class="h5">Đăng nhập</div>
            <hr />
            <div class="mb-3">
              <SoraInput
                type="text"
                label="Email"
                autoFocus={true}
                value={loginData().email}
                errorMessage={errorMessage().email}
                onChange={(email) => setLoginData({ ...loginData(), email })}
              />
            </div>
            <div class="mb-3">
              <SoraInput
                type="password"
                label="Mật khẩu"
                value={loginData().password}
                errorMessage={errorMessage().password}
                onChange={(password) =>
                  setLoginData({ ...loginData(), password })
                }
              />
            </div>
            <div>
              <SoraButton text="Đăng nhập" type="primary" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
