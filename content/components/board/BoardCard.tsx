/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, useContext, useEffect, useRef, useState } from "react";
import { BoardContext } from "../../../pages/board";
import {
  findCardsInColumns,
  columnsAfterMove,
} from "../../utilities/boardHelpers";
import Modal from "../modal";
import Swal from "sweetalert2";
import { debounce } from "../../utilities/debounce";

export type CardInfo = {
  id: string;
  title: string;
  description?: string;
  colors?: string;
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
    let tempColumns = [...columns];
    tempColumns[cardLoc!.col].cards[cardLoc!.row] = cardEdits;
    setColumns([...tempColumns]);
  }, 300);

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
    // console.log("drag start");
    event.dataTransfer.setData("id", info.id);
    setDraggingCard(cardRef);
    setIsDragging(true);
  }

  function handleEndDrag(event: DragEvent<HTMLDivElement>) {
    // console.log("drag end");
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
    console.log(cardEdits.title);

    // edited title is not allowed
    if (cardEdits.title === "") {
      Swal.fire({
        title: "No Title!",
        text: "your card needs a title...",
        icon: "warning",
        customClass: {
          popup: "swal2-dark",
        },
      });
    }

    // all good
    else {
      setIsEditOpen(false);
    }
  }

  return (
    <Modal
      isOpen={isEditOpen}
      onClose={closeModal}
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
                cardStateChangeDebouncer();
              }}
            />
            <textarea
              placeholder={
                info.description ? info.description : "description..."
              }
              onChange={(event) => {
                cardEdits.description = event.target.value;
                cardStateChangeDebouncer();
              }}
            />
            <input
              type="date"
              placeholder="est. end date"
              onChange={(event) => {
                cardEdits.date = event.target.value;
                cardStateChangeDebouncer();
              }}
            />
            <input
              type="color"
              placeholder="color"
              onChange={(event) => {
                cardEdits.colors = event.target.value;
                cardStateChangeDebouncer();
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
            {/* close */}
            <button onClick={closeModal}>close</button>

            {/* delete */}
            <button onClick={deleteCard}>delete</button>
          </div>
        </div>
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
