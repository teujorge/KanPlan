import { createContext, useState } from "react";
import Layout from "../content/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export enum Pages {
  index = "index",
  home = "home",
  workspace = "workspace",
  board = "board",
  settings = "settings",
}

export const AppContext = createContext({
  page: Pages.index,
  setPage: (page: Pages) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [page, setPage] = useState(Pages.index);

  function setPageWrapper(newPage: Pages) {
    if (newPage !== page) {
      setPage(newPage);
    }
  }

  return (
    <AppContext.Provider
      value={{
        page: page,
        setPage: setPageWrapper,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
