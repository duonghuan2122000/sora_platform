import SoraButton from "@/components/buttons/SoraButton";
import SoraInput from "@/components/inputs/SoraInput";
import { useTranslation } from "react-i18next";
import styles from "@/assets/scss/pages/LoginView.module.scss";
import { useState, type FormEvent } from "react";
import {
  defaultLoginValidationInfo,
  validateLoginForm,
  type LoginValidationInfo,
} from "@/utils/validations/login.validation";
/**
 * Màn hình LoginView GET /login
 */
export default function LoginView() {
  const { t } = useTranslation();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginValidationInfo, setLoginValidationInfo] =
    useState<LoginValidationInfo>(defaultLoginValidationInfo);

  // hàm xử lý gửi form
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // thực hiện validate
    const resultValid = await validateLoginForm(loginData);
    if (!resultValid.valid && resultValid.validation) {
      setLoginValidationInfo(resultValid);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmitLogin}>
      <div className={styles.wrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.title}>{t("LoginView.Title")}</div>
          <SoraInput
            autoFocus={true}
            label={t("LoginView.EmailLabel")}
            value={loginData.email}
            onChange={(email) => setLoginData({ ...loginData, email })}
            validation={loginValidationInfo?.validation?.email}
          />
          <SoraInput
            type="password"
            label={t("LoginView.PasswordLabel")}
            value={loginData.password}
            onChange={(password) => setLoginData({ ...loginData, password })}
            validation={loginValidationInfo?.validation?.password}
          />
          <div>
            <SoraButton title={t("LoginView.SubmitText")} />
          </div>
        </div>
      </div>
    </form>
  );
}
