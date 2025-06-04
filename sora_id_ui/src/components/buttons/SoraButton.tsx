import { Show, type Component } from "solid-js";
import styles from "@/assets/scss/components/buttons/SoraButton.module.scss";

interface SoraButtonProps {
  /**
   * Loại button
   */
  type: "primary" | "secondary";

  /**
   * Text button
   */
  text: string;

  /**
   * Cho biết có đang loading không?
   */
  loading?: false;

  /**
   * event click
   */
  onClick?: () => void;
}

/**
 * Component button
 */
const SoraButton: Component<SoraButtonProps> = (props) => {
  return (
    <button
      class="btn"
      classList={{
        "btn-primary": props.type == "primary",
        [styles.soraBtn]: true,
      }}
      on:click={() => props.onClick && props.onClick()}
    >
      <Show when={!!props.loading}>
        <span class="spinner-border spinner-border-sm text-light"></span>
      </Show>
      <span>{props.text}</span>
    </button>
  );
};

export default SoraButton;
