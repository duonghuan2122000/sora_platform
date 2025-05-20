import type React from "react";
import styles from "@/assets/scss/layouts/MainLayout.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LeftMenu from "./LeftMenu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickAvatar = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={clsx(["fa-solid", "fa-bars", styles.menuBars])}></div>
        <div className={styles.avatarDropdown}>
          <div
            className={clsx(["fa-solid", "fa-user-tie", styles.avatar])}
            onClick={handleClickAvatar}
          ></div>
          <div
            className={clsx([
              styles.dropdownContent,
              showDropdown && styles.show,
            ])}
          >
            <div className={styles.dropdownItem}>{t("MainLayout.Logout")}</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <LeftMenu />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
