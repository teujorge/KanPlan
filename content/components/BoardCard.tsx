/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent } from "react";

export type CardInfo = {
  id: string;
  text: string;
};

const BoardCard = ({ info }: { info: CardInfo }) => {
  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("info", JSON.stringify(info));
  }

  return (
    <div
      css={css`
        margin: 10px;
        padding: 10px;

        background-color: green;
      `}
      draggable
      onDragStart={handleDragStart}
    >
      <p>{info.text}</p>
    </div>
  );
};

export default BoardCard;
