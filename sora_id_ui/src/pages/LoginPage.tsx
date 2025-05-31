import SoraInput from "@/components/inputs/SoraInput";
import SoraButton from "@/components/buttons/SoraButton";
import { createSignal } from "solid-js";

interface LoginDataTypes {
  email?: string;
  password?: string;
}

/**
 * Màn hình đăng nhập
 */
const LoginPage = () => {
  const [loginData, setLoginData] = createSignal<LoginDataTypes>({});

  const handleLogin = () => {
    let loginDataVal = loginData();
    alert(`Email=${loginDataVal.email} - Pass=${loginDataVal.password}`);
  };

  return (
    <div class="col-12 p-3 col-sm-6 offset-sm-3 col-xl-4 offset-xl-4">
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
              onChange={(email) => setLoginData({ ...loginData(), email })}
            />
          </div>
          <div class="mb-3">
            <SoraInput
              type="password"
              label="Mật khẩu"
              value={loginData().password}
              onChange={(password) =>
                setLoginData({ ...loginData(), password })
              }
            />
          </div>
          <div>
            <SoraButton text="Đăng nhập" type="primary" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
