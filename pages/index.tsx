import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderDropdown from "../content/components/HeaderDropdown";
import WorkspaceCard, { Size } from "../content/components/WorkspaceCard";
import Column from "../public/svgs/ColumnSvg";
import ColumnSvg from "../public/svgs/ColumnSvg";
import { AppContext, Pages } from "./_app";
import { useContext } from "react";

export default function Index() {
  const { setPage } = useContext(AppContext);
  setPage(Pages.index);

  return (
    <div className={styles.container}>
      <Head>
        <title>KanPlan</title>
        <meta name="description" content="Welcome to KanPlan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <WorkspaceCard
          title={"Workspace"}
          description={
            "description description description description description description description"
          }
          size={Size.m}
          qtProgress={0}
          qtOverdue={0}
          href={""}
        />
        <HeaderDropdown
          icon={ColumnSvg}
          title={"WorkSpaces"}
          links={["Workspace 1", "Workspace 2", "Workspace 3"]}
        />

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
