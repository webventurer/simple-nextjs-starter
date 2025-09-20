import clsx from "clsx";
import styles from "./SimpleHeader.module.scss";

export interface SimpleHeaderProps {
  title?: string;
  logoText?: string;
  navLinks?: { text: string; href: string }[];
  variant?: "compact" | "transparent";
  className?: string;
}

export function SimpleHeader({
  title = "Simple Starter",
  logoText = "S",
  navLinks = [
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
    { text: "Features", href: "/features" },
  ],
  variant,
  className,
}: SimpleHeaderProps) {
  return (
    <header
      className={clsx(styles.header, variant && styles[variant], className)}
    >
      <div className={styles.headerContent}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>{logoText}</span>
            </div>
            <h1 className={styles.logoText}>{title}</h1>
          </div>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
