/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";
import TriangleSvg from "../../../public/svgs/TriangleSvg";

const HeaderDropdown = ({
  icon,
  title,
  links,
}: {
  icon: JSX.Element;
  title: string;
  links: string[];
}) => {
  const [showing, setShowing] = useState(false);
  function showHide() {
    setShowing(!showing);
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin: 20px;
        width: calc(100% - 40px);
        color: black;
        border-radius: 20px;
        background-color: #c5e3ed;
      `}
    >
      {/*title div*/}
      <div
        onClick={showHide}
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 20px;
          box-shadow: 0px 0px 8px var(--shadow-color);
          background-color: #9fd1e1;
          cursor: pointer;
        `}
      >
        {/*Icon div*/}
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

        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 10px;
            width: 10px;
            transition: all 0.4s ease;
            transform: rotate(${showing ? 90 : 0}deg);
          `}
        >
          {TriangleSvg}
        </div>
      </div>

      {/*Dropdown div*/}
      <div
        css={css`
          display: ${showing ? "" : "none"};
          padding-bottom: 10px;
        `}
      >
        <ul>
          {links.map((links, i) => (
            <li>
              <Link href="">{links}</Link>
            </li>
          ))}
        </ul>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <button
            css={css`
              width: 50%;
              margin: 6px;
              padding: 8px;
              border-radius: 20px;
              background-color: #00526c;
              box-shadow: 0px 0px 8px var(--shadow-color);
              cursor: pointer;
              transition: filter 0.4s ease;

              :hover {
                filter: brightness(1.2);
              }
            `}
          >
            + New
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeaderDropdown;
