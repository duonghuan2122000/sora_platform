import type { Component } from "solid-js";

interface SoraInputProps {
  /**
   * Label input
   */
  label?: string;

  /**
   * Input type
   */
  type: "text";

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * auto focus
   */
  autoFocus?: boolean;
}

const randomHash = btoa(Math.random().toString()).substring(0, 8);

/**
 * Component input
 */
const SoraInput: Component<SoraInputProps> = (props) => {
  return (
    <div>
      <label for={randomHash} class="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        class="form-control"
        id={randomHash}
        placeholder={props.placeholder}
        autofocus={props.autoFocus}
      />
    </div>
  );
};

export default SoraInput;
