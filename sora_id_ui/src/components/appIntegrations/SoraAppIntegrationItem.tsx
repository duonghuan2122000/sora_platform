import { A } from "@solidjs/router";
import styles from "@/assets/scss/components/appIntegrations/SoraAppIntegrationItem.module.scss";

const SoraAppIntegrationItem = () => {
  return (
    <A href="" class={styles.appItem}>
      <div class={styles.appIcon}></div>
      <div class={styles.appTitle}>Demo</div>
    </A>
  );
};

export default SoraAppIntegrationItem;
