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
}

/**
 * Component button
 */
const SoraButton: Component<SoraButtonProps> = (props) => {
  return (
    <button class="btn" classList={{ "btn-primary": props.type == "primary" }}>
      {props.text}
    </button>
  );
};

export default SoraButton;
