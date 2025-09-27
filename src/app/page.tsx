export default async function Home() {
  const { default: Page } = await import(`@/content/home.mdx`);
  return <Page />;
}
