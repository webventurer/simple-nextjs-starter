import clsx from 'clsx';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  flavour: 'strong' | 'subtle';
}

export default function Section({ children, flavour }: SectionProps) {
  const classes = clsx(
    styles.section,
    styles[flavour] // Direct dynamic access - simpler than conditional object
  );

  return (
    <section className={classes}>
      {children}
    </section>
  );
}
