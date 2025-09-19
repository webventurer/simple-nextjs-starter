import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Next.js Starter
        </h1>
        <p className={styles.subtitle}>
          A clean, modern starter template for your Next.js projects.
        </p>
        <div className={styles.footer}>
          <p>Edit <code>src/app/page.tsx</code> to get started</p>
        </div>
      </main>
    </div>
  );
}
