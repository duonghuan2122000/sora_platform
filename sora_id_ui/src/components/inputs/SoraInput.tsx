import styles from "@/assets/scss/components/inputs/SoraInput.module.scss";
import type { ValidationInfoBase } from "@/utils/validations/base.validation";
import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type SoraInputProps = {
  label?: string;

  // tự động focus input
  autoFocus?: boolean;

  // loại input
  type?: "text" | "password";

  // giá trị thẻ input
  value?: string;

  // props callback khi giá trị input thay đổi
  onChange?: (val: string) => void;

  // thông tin validation
  validation?: ValidationInfoBase;
};

/**
 * Component input
 */
export default function SoraInput(props: SoraInputProps) {
  const { t } = useTranslation();
  const autoFocus = props.autoFocus ?? false;
  const typeInit = props.type ?? "text";
  const [type, setType] = useState(typeInit);

  const togglePassword = () => {
    if (type == "password") {
      setType("text");
      return;
    }
    setType("password");
  };

  return (
    <div className={styles.soraInputContainer}>
      {props.label && (
        <label
          className={clsx([
            styles.label,
            !(props.validation?.valid ?? true) && styles.invalid,
          ])}
        >
          {props.label}
        </label>
      )}
      <div className={styles.inputControl}>
        <input
          type={type}
          autoFocus={autoFocus}
          className={clsx([
            styles.input,
            typeInit == "password" && styles.password,
            !(props.validation?.valid ?? true) && styles.invalid,
          ])}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
        {typeInit == "password" && (
          <span
            className={clsx([
              styles.iconEyes,
              "fa-solid",
              type == "password" && "fa-eye",
              type == "text" && "fa-eye-slash",
            ])}
            onClick={togglePassword}
          ></span>
        )}
      </div>
      {!(props.validation?.valid ?? true) && (
        <span className={styles.invalidMessage}>
          {t(props.validation?.message ?? "")}
        </span>
      )}
    </div>
  );
}
