import SoraAppIntegrationItem from "@/components/appIntegrations/SoraAppIntegrationItem";
import styles from "@/assets/scss/pages/ListAppIntegration.module.scss";

export default function ListAppIntegration() {
  return (
    <div class={styles.listAppIntegration}>
      <div class="row">
        <div class="col-4">
          <SoraAppIntegrationItem />
        </div>
      </div>
    </div>
  );
}
