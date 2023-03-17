/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext, Pages } from "../../../pages/_app";

const HeaderDropdown = ({
  icon,
  title,
  href,
}: {
  icon: JSX.Element;
  title: string;
  href: Pages;
}) => {
  const { page } = useContext(AppContext);

  const [showing, setShowing] = useState(false);
  function showHide() {
    setShowing(!showing);
  }

  const isPageActive = href === page;

  return (
    <Link
      href={href}
      onClick={showHide}
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-left: ${isPageActive ? 40 : 20}px;
        width: 210px;

        color: black;
        border-radius: 20px;
        background-color: #9fd1e1;

        transition: padding 0.2s ease;
      `}
    >
      <div
        css={css`
          height: 25px;
          width: 25px;
        `}
      >
        {icon}
      </div>

      <h3
        css={css`
          width: 70%;
        `}
      >
        {title}
      </h3>
    </Link>
  );
};
export default HeaderDropdown;
