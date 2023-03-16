/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export enum Size {
  s = "small",
  m = "medium",
  l = "large",
}
const WorkspaceCard = ({
  title,
  description,
  qtProgress,
  qtOverdue,
  href,
  size = Size.m,
}: {
  title: string;
  description: string;
  qtProgress: number;
  qtOverdue: number;
  href: string;
  size?: Size;
}) => {
  let width = 350;
  switch (size) {
    case Size.s:
      width = 300;
      break;
    case Size.m:
      width = 350;
      break;
    case Size.l:
      width = 400;
      break;
  }

  return (
    <Link
      href={href}
      css={css`
        margin: 20px;
        padding: 5px;
        cursor: pointer;

        :hover > div {
          filter: brightness(1.1);
          transform: translateY(-5px);
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: ${width}px;
          padding: 15px;
          border-radius: 20px;
          color: black;
          background-color: #9fd1e1;
          box-shadow: 0px 0px 8px var(--shadow-color);
          transition: all 0.4s ease-in;
        `}
      >
        <h3
          css={css`
            font-weight: bold;
            margin: 0;
          `}
        >
          {title}
        </h3>
        <p
          css={css`
            font-weight: 600;
            margin-top: 6px;
          `}
        >
          {description}
        </p>

        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            div {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50%;
              margin: 6px;
              padding: 8px;
              border-radius: 20px;
              background-color: #161616;
              box-shadow: 0px 0px 8px var(--shadow-color);
            }
          `}
        >
          <div
            css={css`
              color: #c0ffd2;
            `}
          >
            {qtProgress} in-progress
          </div>
          <div
            css={css`
              color: #ffd6d6;
            `}
          >
            {qtOverdue} overdue
          </div>
        </div>
      </div>
    </Link>
  );
};
export default WorkspaceCard;
