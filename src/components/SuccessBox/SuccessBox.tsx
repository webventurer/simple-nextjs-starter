import styles from "./SuccessBox.module.scss";

interface SuccessBoxProps {
  children: React.ReactNode;
}

export default function SuccessBox({ children }: SuccessBoxProps) {
  return <div className={styles.successBox}>{children}</div>;
}
