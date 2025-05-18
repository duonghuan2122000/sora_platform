import styles from "@/assets/scss/routes/LoaderView.module.scss";
/**
 * Component Loader
 */
export default function LoaderView() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}
