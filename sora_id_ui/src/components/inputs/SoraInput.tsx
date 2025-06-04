import { createSignal, onMount, Show, type Component } from "solid-js";
import styles from "@/assets/scss/components/inputs/SoraInput.module.scss";

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
   * Thông tin error
   */
  errorMessage?: string;

  /**
   * event handle value change
   */
  onChange?: (val?: string) => void;

  /**
   * Sự kiện blur input
   */
  onBlur?: (e: FocusEvent) => void;
}

/**
 * Component input
 */
const SoraInput: Component<SoraInputProps> = (props) => {
  const [randomHash, setRandomHash] = createSignal("");

  // Biến lưu giá trị type khởi tạo từ component cha
  const [inputType, setInputType] = createSignal(props.type);

  onMount(() => {
    setRandomHash(btoa(Math.random().toString()).substring(0, 8));
  });

  return (
    <div>
      <label for={randomHash()} class="form-label">
        {props.label}
      </label>
      <div class={styles.inputContainer}>
        <input
          type={inputType()}
          class="form-control"
          classList={{
            [styles.input]: true,
            "is-invalid": !!props.errorMessage,
          }}
          id={randomHash()}
          placeholder={props.placeholder}
          autofocus={props.autoFocus}
          value={props.value ?? ""}
          on:change={(e) => props.onChange && props.onChange(e.target.value)}
          on:blur={(e) => props.onBlur && props.onBlur(e)}
        />
        <Show when={props.type == "password" && inputType() == "password"}>
          <i
            class="fa-solid fa-eye"
            classList={{ [styles.inputIconEye]: true }}
            on:click={() => setInputType("text")}
          ></i>
        </Show>

        <Show when={props.type == "password" && inputType() == "text"}>
          <i
            class="fa-solid fa-eye-slash"
            classList={{ [styles.inputIconEyeSlash]: true }}
            on:click={() => setInputType("password")}
          ></i>
        </Show>

        <Show when={props.errorMessage}>
          <div class="invalid-feedback">{props.errorMessage}</div>
        </Show>
      </div>
    </div>
  );
};

export default SoraInput;
