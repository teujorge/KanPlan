/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, useContext, useState } from "react";
import { BoardContext } from "../../../pages/board";
import {
  findCardsInColumns,
  columnsAfterMove,
} from "../../utilities/boardHelpers";

export type CardInfo = {
  id: string;
  text: string;
};

const BoardCard = ({ info }: { info: CardInfo }) => {
  const { columns, setColumns } = useContext(BoardContext);

  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("id", info.id);
    setIsDragging(true);
  }

  function handleDragEnd(event: DragEvent<HTMLDivElement>) {
    setIsDragging(false);
  }

  function handleCardDragOverEnter(event: DragEvent<HTMLDivElement>) {
    if (!isDragging) setIsDragOver(true);
    else setIsDragOver(false);
  }

  function handleCardDragOverLeave(event: DragEvent<HTMLDivElement>) {
    setIsDragOver(false);
  }

  function handleDropCard(event: DragEvent<HTMLDivElement>) {
    // ignore parent onDrop
    event.stopPropagation();

    // obtain dropped card info
    const cardId = event.dataTransfer.getData("id");

    // find cards in arrays

    const { card1Loc: draggedCardLoc, card2Loc: thisCardLoc } =
      findCardsInColumns({
        columns: columns,
        card1Id: cardId,
        card2Id: info.id,
      });

    console.log(draggedCardLoc, thisCardLoc);

    // update dropped card list based on where it was dropped
    let newColumns = columnsAfterMove({
      columns: columns,
      initialLoc: draggedCardLoc!,
      finalLoc: thisCardLoc!,
    });
    setColumns([...newColumns]);
    setIsDragOver(false);
  }

  return (
    <div
      css={css`
        padding: 12px;

        width: 100%;

        opacity: ${isDragging ? 0.25 : 1};

        transition: opacity 0.2s ease;
      `}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleCardDragOverEnter}
      onDragLeave={handleCardDragOverLeave}
      onDrop={handleDropCard}
    >
      <div
        css={css`
          pointer-events: none;
          padding: 10px;
          border-radius: var(--border-radius);
          background-color: green;
          transform: translate(
              ${isDragOver ? -20 : 0}px,
              ${isDragOver ? 20 : 0}px
            )
            rotateZ(${isDragOver ? 2 : 0}deg);
          transition: transform 0.2s ease;
        `}
      >
        {info.text}
      </div>
    </div>
  );
};

export default BoardCard;
