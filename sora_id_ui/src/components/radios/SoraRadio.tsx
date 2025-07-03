import { createSignal, onMount, Show, type Component } from "solid-js";

interface SoraRadioProps {
  /**
   * Tên label
   */
  label?: string;

  /**
   * Tên radio
   */
  name: string;

  /**
   * giá trị
   */
  value: string;

  /**
   * Giá trị selected hiện tại của radio
   */
  selected?: string;

  /**
   * Hàm nhận sự kiện khi thay đổi giá trị radio
   */
  onChange?: (val: string) => void;
}

/**
 * Component radio
 */
const SoraRadio: Component<SoraRadioProps> = (props) => {
  const [randomHash, setRandomHash] = createSignal("");

  onMount(() => {
    setRandomHash(btoa(Math.random().toString()).substring(0, 8));
  });

  return (
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name={props.name}
        id={randomHash()}
        value={props.value}
        checked={props.selected === props.value}
        onChange={(e) =>
          props.onChange && props.onChange(e.currentTarget.value)
        }
      />
      <Show when={!!props.label}>
        <label class="form-check-label" for={randomHash()}>
          {props.label}
        </label>
      </Show>
    </div>
  );
};

export default SoraRadio;
