import type { Component } from "solid-js";

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
      classList={{ "btn-primary": props.type == "primary" }}
      on:click={() => props.onClick && props.onClick()}
    >
      {props.text}
    </button>
  );
};

export default SoraButton;
