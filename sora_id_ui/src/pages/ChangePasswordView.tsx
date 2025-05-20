import MainLayout from "@/layouts/MainLayout";
import { layoutConfigAtom } from "@/stores/layout.store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "@/assets/scss/pages/ChangePasswordView.module.scss";
import SoraInput from "@/components/inputs/SoraInput";
import SoraButton from "@/components/buttons/SoraButton";

type ChangePasswordData = {
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

const ChangePasswordView = () => {
  const { t } = useTranslation();
  const [layoutConfig, setLayoutConfig] = useAtom(layoutConfigAtom);

  const [changePasswordData] = useState<ChangePasswordData>();

  useEffect(() => {
    setLayoutConfig({ ...layoutConfig, currentLeftMenuName: "UserInfoView" });
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.title}>{t("ChangePasswordView.Title")}</div>
        <form className={styles.form}>
          <div className={styles.item}>
            <SoraInput
              label={t("ChangePasswordView.PasswordLabel")}
              value={changePasswordData?.password}
              autoFocus={true}
              type="password"
            />
          </div>
          <div className={styles.item}>
            <SoraInput
              label={t("ChangePasswordView.NewPasswordLabel")}
              value={changePasswordData?.newPassword}
              type="password"
            />
          </div>
          <div className={styles.item}>
            <SoraInput
              label={t("ChangePasswordView.ConfirmNewPasswordLabel")}
              value={changePasswordData?.confirmNewPassword}
              type="password"
            />
          </div>
          <div>
            <SoraButton title={t("ChangePasswordView.Submit")} />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ChangePasswordView;
