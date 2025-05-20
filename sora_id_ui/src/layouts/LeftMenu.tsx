import styles from "@/assets/scss/layouts/LeftMenu.module.scss";
import { layoutConfigAtom } from "@/stores/layout.store";
import clsx from "clsx";
import { useAtom } from "jotai";

const LeftMenu = () => {
  const [layoutConfig] = useAtom(layoutConfigAtom);

  return (
    <div className={styles.leftMenu}>
      {layoutConfig.leftMenuItems.map((item) => (
        <div
          className={clsx([
            styles.leftMenuItem,
            layoutConfig.currentLeftMenuName == item.name && styles.active,
          ])}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default LeftMenu;
