/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, useContext, useRef, useState } from "react";
import { BoardContext } from "../../../pages/board";
import {
  findCardsInColumns,
  columnsAfterMove,
} from "../../utilities/boardHelpers";
import Modal from "../modal";

export type CardInfo = {
  id: string;
  title: string;
  description?: string;
  colors?: string[];
  date?: string;
};

const BoardCard = ({ info }: { info: CardInfo }) => {
  const { columns, setColumns, draggingCard, setDraggingCard } =
    useContext(BoardContext);

  const cardRef = useRef<HTMLDivElement>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  let cardEdits: CardInfo = {
    id: info.id,
    title: info.title,
    description: info.description,
    colors: info.colors,
    date: info.date,
  };

  function handleCardDragOverEnter(event: DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (!isDragging) setIsDragOver(true);
    else setIsDragOver(false);
  }

  function handleCardDragOverLeave(event: DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    setIsDragOver(false);
  }

  function handleStartDrag(event: DragEvent<HTMLDivElement>) {
    console.log("drag start");
    event.dataTransfer.setData("id", info.id);
    setDraggingCard(cardRef);
    setIsDragging(true);
  }

  function handleEndDrag(event: DragEvent<HTMLDivElement>) {
    console.log("drag end");
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

    // same card
    if (cardId === info.id) return;

    // find cards in arrays
    const locations = findCardsInColumns({
      columns: columns,
      ids: [cardId, info.id],
    });
    const draggedCardLoc = locations[0];
    const thisCardLoc = locations[1];

    // update dropped card list based on where it was dropped
    let newColumns = columnsAfterMove({
      columns: columns,
      initialLoc: draggedCardLoc!,
      finalLoc: thisCardLoc!,
    });
    setColumns([...newColumns]);
    setIsDragOver(false);
  }

  function saveCardEdits() {
    console.log(cardEdits);

    const cardLoc = findCardsInColumns({
      columns: columns,
      ids: [info.id],
    })[0];

    let tempColumns = [...columns];
    tempColumns[cardLoc!.col].cards[cardLoc!.row] = cardEdits;
    setColumns([...tempColumns]);
  }

  return (
    <Modal
      isOpen={isEditOpen}
      onClose={() => {
        setIsEditOpen(false);
      }}
      innerComponent={
        <div
          css={css`
            padding: 20px;

            border-radius: var(--border-radius);
            background-color: var(--background-color);
            box-shadow: 0px 0px 8px var(--shadow-color);
          `}
        >
          {/* inputs */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              margin: 10px;
            `}
          >
            <input
              type="text"
              placeholder={info.title}
              onChange={(event) => {
                cardEdits.title = event.target.value;
              }}
            />
            <textarea
              placeholder={
                info.description ? info.description : "description..."
              }
              onChange={(event) => {
                cardEdits.description = event.target.value;
              }}
            />
            <input
              type="date"
              placeholder="est. end date"
              onChange={(event) => {
                cardEdits.date = event.target.value;
              }}
            />
            <input
              type="color"
              placeholder="color"
              onChange={(event) => {
                cardEdits.colors = [event.target.value];
              }}
            />
          </div>

          {/* buttons */}
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;

              margin: 10px;
            `}
          >
            <button onClick={() => setIsEditOpen(false)}>cancel</button>
            <button
              onClick={() => {
                setIsEditOpen(false);
                saveCardEdits();
              }}
            >
              save
            </button>
          </div>
        </div>
      }
      outerComponent={
        <div
          css={css`
            cursor: pointer;

            padding-top: 10px;
            padding-left: 10px;
            padding-right: 10px;

            width: 100%;
            opacity: ${isDragging ? 0.2 : 1};
            transition: transform 1s ease, height 1s ease, opacity 0.2s ease;
          `}
          ref={cardRef}
          draggable={true}
          onDragStart={handleStartDrag}
          onDragEnd={handleEndDrag}
          onDragEnter={handleCardDragOverEnter}
          onDragLeave={handleCardDragOverLeave}
          onDrop={handleDropDrag}
          onClick={() => setIsEditOpen(true)}
        >
          <div
            css={css`
              pointer-events: none;
              margin-top: ${isDragOver
                ? draggingCard?.current?.clientHeight
                : 0}px;
              padding: 10px;
              border-radius: var(--border-radius);
              background-color: var(--highlight-soft);
              transition: margin var(--transition-time) ease;
            `}
          >
            {info.title}
          </div>
        </div>
      }
    />
  );
};

export default BoardCard;
