/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const WorkspaceCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 20px;
        padding: 20px;
        font-weight: bold;
        border-radius: 20px;
        color: black;
        background-color: #9fd1e1;
        box-shadow: 0px 0px 8px var(--shadow-color);
      `}
    >
      <h3
        css={css`
          margin: 0;
        `}
      >
        {title}
      </h3>
      <p
        css={css`
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
        `}
      >
        <button
          css={css`
            width: 50%;
            margin: 6px;
            padding: 8px;
            color: #c0ffd2;
            border-radius: 20px;
            background-color: #161616;
            box-shadow: 0px 0px 8px var(--shadow-color);
          `}
        >
          X in-progress
        </button>
        <button
          css={css`
            width: 50%;
            margin: 6px;
            color: #ffd6d6;
            border-radius: 20px;
            background-color: #161616;
            box-shadow: 0px 0px 8px var(--shadow-color);
          `}
        >
          X overdue
        </button>
      </div>
    </div>
  );
};
export default WorkspaceCard;
