import styles from './CTA.module.scss';
import Link from 'next/link';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTA({ title, description, buttonText, buttonHref }: CTAProps) {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <nav className={styles.buttons}>
        <Link href={buttonHref}>
          {buttonText}
        </Link>
      </nav>
    </section>
  );
}
