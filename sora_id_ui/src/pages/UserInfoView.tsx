import MainLayout from "@/layouts/MainLayout";
import { useTranslation } from "react-i18next";
import styles from "@/assets/scss/pages/UserInfoView.module.scss";
import SoraButton from "@/components/buttons/SoraButton";
import { useLocation } from "wouter";

const UserInfoView = () => {
  const { t } = useTranslation();
  const [_, navigate] = useLocation();

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.title}>{t("UserInfoView.Title")}</div>
        <div className={styles.info}>
          <div className={styles.item}>
            <div className={styles.text}>
              <div className={styles.label}>Email:</div>
              <div>dbhuan@test.com</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.text}>
              <div className={styles.label}>Mật khẩu:</div>
              <div>******</div>
            </div>
            <SoraButton
              title="Thay đổi"
              onClick={() => navigate("/cu/password/change")}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserInfoView;
