import type { FC } from "react";
import styles from "@/assets/scss/components/buttons/SoraButton.module.scss";
import clsx from "clsx";

type SoraButtonProps = {
  // text
  title: string;

  // loại button
  type?: "primary" | "secondary";

  onClick?: () => void;
};

/**
 * Component button
 */
const SoraButton: FC<SoraButtonProps> = (props: SoraButtonProps) => {
  // Loại button
  const buttonType = props.type ?? "primary";

  return (
    <button
      className={clsx([styles.soraButton, styles[buttonType]])}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default SoraButton;
