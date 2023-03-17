/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Header from "./components/header/Header";
import { AppContext } from "../pages/_app";
import { getPageLayout } from "./utilities/getPageLayout";
import { ReactNode, useContext } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { page } = useContext(AppContext);
  const pageLayout = getPageLayout(page);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        /* align-items: center; */
      `}
    >
      {pageLayout.showHeader && <Header />}
      {children}
    </div>
  );
};

export default Layout;
