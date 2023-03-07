/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, useContext, useRef, useState } from "react";
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
  const { columns, setColumns, draggingCard, setDraggingCard } =
    useContext(BoardContext);

  const cardRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleCardDragOverEnter(event: DragEvent<HTMLDivElement>) {
    if (!isDragging) setIsDragOver(true);
    else setIsDragOver(false);
  }

  function handleCardDragOverLeave(event: DragEvent<HTMLDivElement>) {
    setIsDragOver(false);
  }

  function handleStartDrag(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("id", info.id);
    setDraggingCard(cardRef);
    setIsDragging(true);
  }

  function handleEndDrag(event: DragEvent<HTMLDivElement>) {
    setDraggingCard(null);
    setIsDragging(false);
  }

  function handleDropDrag(event: DragEvent<HTMLDivElement>) {
    setDraggingCard(null);
    console.log("card drop");

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
      ref={cardRef}
      draggable
      onDragStart={handleStartDrag}
      onDragEnd={handleEndDrag}
      onDragEnter={handleCardDragOverEnter}
      onDragLeave={handleCardDragOverLeave}
      onDrop={handleDropDrag}
    >
      <div
        css={css`
          pointer-events: none;
          padding: 10px;
          border-radius: var(--border-radius);
          background-color: green;
          margin-top: ${isDragOver ? draggingCard?.current?.clientHeight : 0}px;
          transition: margin 0.2s ease;
        `}
      >
        {info.text}
      </div>
    </div>
  );
};

export default BoardCard;
