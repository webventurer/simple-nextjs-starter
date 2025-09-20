import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className="page-layout">
      <main className={styles.content}>
        <header className={styles.header}>
          <h1>Landing Starter - Next.js</h1>
          <p>A clean Next.js starter for landing pages with MDX support</p>
        </header>

        <section className={styles.sections}>
          <div className={styles.card}>
            <h2>Features</h2>
            <ul>
              <li>Next.js 15 with App Router</li>
              <li>SCSS modules for styling</li>
              <li>MDX support with GitHub Flavored Markdown</li>
              <li>SCSS preprocessing capabilities</li>
              <li>TypeScript configuration</li>
              <li>Layout + Content CSS architecture pattern</li>
            </ul>
          </div>

          <div className={styles.demoCard}>
            <h2>Demo</h2>
            <p>
              Check out our MDX demo page to see GitHub Flavored Markdown
              features in action.
            </p>
            <a href="/mdx-demo" className={styles.demoLink}>
              View MDX Demo →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
