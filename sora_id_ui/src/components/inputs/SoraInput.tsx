import { createSignal, onMount, type Component } from "solid-js";

interface SoraInputProps {
  /**
   * Label input
   */
  label?: string;

  /**
   * Input type
   */
  type: "text" | "password";

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * auto focus
   */
  autoFocus?: boolean;

  /**
   * value
   */
  value?: string;

  /**
   * event handle value change
   */
  onChange?: (val?: string) => void;
}

/**
 * Component input
 */
const SoraInput: Component<SoraInputProps> = (props) => {
  const [randomHash, setRandomHash] = createSignal("");

  onMount(() => {
    setRandomHash(btoa(Math.random().toString()).substring(0, 8));
  });

  return (
    <div>
      <label for={randomHash()} class="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        class="form-control"
        id={randomHash()}
        placeholder={props.placeholder}
        autofocus={props.autoFocus}
        value={props.value ?? ""}
        on:change={(e) => props.onChange && props.onChange(e.target.value)}
      />
    </div>
  );
};

export default SoraInput;
