/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, useContext, useEffect, useRef, useState } from "react";
import { BoardContext } from "../../../pages/board";
import {
  findCardsInColumns,
  columnsAfterMove,
} from "../../utilities/boardHelpers";
import Modal from "../Modal";
import { debounce } from "../../utilities/debounce";
import BoardCardModalInner from "./BoardCardModalInner";
import Swal from "sweetalert2";

export type CardInfo = {
  id: string;
  title: string;
  description?: string;
  colors: string[];
  date?: string;
};

const BoardCard = ({ info }: { info: CardInfo }) => {
  const { columns, setColumns, draggingCard, setDraggingCard } =
    useContext(BoardContext);

  const cardRef = useRef<HTMLDivElement>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const cardStateChangeDebouncer = debounce(() => {
    const cardLoc = findCardsInColumns({ columns: columns, ids: [info.id] })[0];
    if (cardEdits.title === "") cardEdits.title = info.title;
    let tempColumns = [...columns];
    tempColumns[cardLoc!.col].cards[cardLoc!.row] = cardEdits;
    setColumns([...tempColumns]);
  }, 1000);

  useEffect(() => {
    if (info.title === "") {
      setIsEditOpen(true);
    }
  }, [info, isEditOpen]);

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

    setDraggingCard({
      info: info,
      ref: cardRef,
    });

    setIsDragging(true);
  }

  function handleEndDrag(event: DragEvent<HTMLDivElement>) {
    console.log("drag end");
    setDraggingCard(null);
    setIsDragging(false);
  }

  function handleDropDrag(event: DragEvent<HTMLDivElement>) {
    setDraggingCard(null);
    // console.log("card drop");

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

    // update dropped card list based on where it was dropped
    let newColumns = columnsAfterMove({
      columns: columns,
      initialLoc: locations[0]!,
      finalLoc: locations[1]!,
    });
    setColumns([...newColumns]);
    setIsDragOver(false);
  }

  function deleteCard() {
    const cardLoc = findCardsInColumns({
      columns: columns,
      ids: [info.id],
    })[0];

    let tempColumns = [...columns];
    tempColumns[cardLoc!.col].cards.splice(cardLoc!.row, 1);
    setColumns([...tempColumns]);
  }

  function closeModal() {
    if (info.title === "") {
      Swal.fire({
        title: "no title?",
        text: "your card requires a title...",
        icon: "warning",
      });
    } else {
      setIsEditOpen(false);
    }
  }

  function getDateBGColor(): string {
    let dateBGColor = "transparent";
    if (info.date) {
      const nowMs = Date.now();
      const dateMs = new Date(info.date).getTime();

      const oneDayMs = 24 * 60 * 60 * 1000;
      const dateDiffMs = dateMs - nowMs;

      // date is in the past
      if (dateDiffMs + 2 * oneDayMs < 0) {
        dateBGColor = "#d1000050";
      } else if (dateDiffMs - 2 * oneDayMs < 0) {
        dateBGColor = "#d8730050";
      } else {
        dateBGColor = "#00d10050";
      }
    }

    return dateBGColor;
  }

  return (
    <Modal
      isOpen={isEditOpen}
      onClose={closeModal}
      innerComponent={
        <BoardCardModalInner
          info={info}
          cardEdits={cardEdits}
          deleteCard={deleteCard}
          closeModal={closeModal}
          cardStateChangeDebouncer={cardStateChangeDebouncer}
        />
      }
      outerComponent={
        <div
          id={info.id}
          css={css`
            cursor: pointer;

            padding-top: 10px;
            padding-left: 10px;
            padding-right: 10px;

            width: 100%;

            opacity: ${isDragging ? 0.1 : 1};
            transition: transform 0.5s ease, height 0.5s ease, opacity 0.2s ease;
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
              position: relative;
              pointer-events: none;
              margin-top: ${isDragOver
                ? draggingCard?.ref.current?.clientHeight
                : 0}px;
              padding: 10px;
              border-radius: var(--border-radius);
              background-color: var(--highlight-soft);
              transition: margin var(--transition-time) ease;
            `}
          >
            {/* title */}
            <h3
              css={css`
                font-weight: 500;
                font-size: 16px;
                margin: 2px;
                padding: 2px;
              `}
            >
              {info.title}
            </h3>

            {/* description */}
            {info.description && (
              <p
                css={css`
                   {
                    font-size: 14px;
                    margin: 1px;
                    padding: 1px;
                  }
                `}
              >
                {info.description}
              </p>
            )}

            {/* date */}
            {info.date && (
              <p
                css={css`
                  font-size: 12px;
                  margin-top: 10px;
                  margin-bottom: 0px;
                  padding-top: 2px;
                  padding-bottom: 2px;
                  padding-left: 6px;
                  padding-right: 6px;
                  width: fit-content;

                  border-radius: var(--border-radius);
                  background-color: ${getDateBGColor()};
                `}
              >
                {info.date}
              </p>
            )}

            {/* colors */}
            {info.colors.map((color, index) => {
              if (color !== "") {
                return (
                  <div
                    key={`card-${info.id}-color-${index}`}
                    css={css`
                      position: absolute;
                      top: 0px;
                      left: ${index * 35}px;

                      width: 30px;
                      height: 6px;

                      border-radius: var(--border-radius);
                      background-color: ${color};
                    `}
                  />
                );
              }
            })}
          </div>
        </div>
      }
    />
  );
};

export default BoardCard;
