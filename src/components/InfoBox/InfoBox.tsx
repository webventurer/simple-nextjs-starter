import styles from './InfoBox.module.scss';

interface InfoBoxProps {
  children: React.ReactNode;
}

export default function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className={styles.infoBox}>
      {children}
    </div>
  );
}
