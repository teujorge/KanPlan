/** @jsxImportSource @emotion/react */
import { v4 as uuidv4 } from "uuid";
import BoardCard, { CardInfo } from "./BoardCard";
import { BoardContext } from "../../../pages/board";
import { css } from "@emotion/react";
import { DragEvent, useContext, useState } from "react";
import {
  findCardsInColumns,
  columnsAfterMove,
} from "../../utilities/boardHelpers";
import { debounce } from "../../utilities/debounce";

export type Column = {
  title: string;
  cards: CardInfo[];
};

const BoardColumn = ({ index }: { index: number }) => {
  const { columns, setColumns, draggingCard } = useContext(BoardContext);

  const [isDragOver, setIsDragOver] = useState(false);

  let titleEditInput = "";
  const columnTitleStateChangeDebouncer = debounce(() => {
    if (titleEditInput === "") return;

    let tempColumns = [...columns];
    tempColumns[index].title = titleEditInput;
    setColumns([...tempColumns]);
  }, 1000);

  function createNewCard() {
    let tempColumns = [...columns];

    const newId = uuidv4();
    const newCard: CardInfo = {
      id: newId,
      title: "",
    };

    tempColumns[index].cards.push(newCard);

    setColumns([...tempColumns]);
  }

  function deleteColumn() {
    const tempColumns = columns;
    tempColumns.splice(index, 1);
    setColumns([...tempColumns]);
  }

  function handleCardDragOverEnter(event: DragEvent<HTMLDivElement>) {
    setIsDragOver(true);
  }

  function handleCardDragOverLeave(event: DragEvent<HTMLDivElement>) {
    setIsDragOver(false);
  }

  function enableDroppingCard(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDropCard(event: DragEvent<HTMLDivElement>) {
    setIsDragOver(false);
    // console.log("column drop");

    // obtain dropped card info
    const cardId = event.dataTransfer.getData("id");

    // find dropped card in cards list
    const draggedCardLoc = findCardsInColumns({
      columns: columns,
      ids: [cardId],
    })[0];

    // update dropped card list based on where it was dropped
    let newColumns = columnsAfterMove({
      columns: columns,
      initialLoc: draggedCardLoc!,
      finalLoc: { col: index, row: columns[index].cards.length },
    });
    setColumns([...newColumns]);
  }

  let cards: CardInfo[] = columns[index].cards;

  const paddingBottom =
    draggingCard && draggingCard.current && isDragOver
      ? draggingCard.current.clientHeight + 40
      : 40;

  return (
    <div
      css={css`
        margin: 10px;
        width: 250px;
      `}
    >
      {/* header */}
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
        `}
      >
        {/* title */}
        <input
          css={css`
            padding: 4px;
            margin-inline: auto;
            width: 80%;
            font-size: 20px;
            text-overflow: ellipsis;

            color: var(--foreground-color);
            background: none;
            border-top: 2px solid transparent;
            border-bottom: 2px solid;
            border-left: 2px solid transparent;
            border-right: 2px solid transparent;

            :focus {
              outline: none;

              ::placeholder {
                opacity: 0.5;
              }
            }

            ::placeholder {
              color: var(--foreground-color);
            }
          `}
          type="text"
          placeholder={columns[index].title}
          onChange={(event) => {
            titleEditInput = event.target.value;
            columnTitleStateChangeDebouncer();
          }}
        />

        {/* settings */}
        <div
          css={css`
            cursor: pointer;

            position: absolute;
            top: 0px;
            right: 0px;

            display: flex;
            align-items: center;
            justify-content: center;

            width: 20px;
            height: 30px;

            border-radius: var(--border-radius);

            transition: background-color var(--transition-time) ease;

            :hover {
              background-color: var(--highlight-soft);
            }
          `}
          onClick={deleteColumn}
        >
          X
        </div>
      </div>

      {/* column with cards */}
      <div
        css={css`
          user-select: none;
          position: relative;
          display: flex;
          flex-direction: column;
         justify-content: : center;
          align-items: center;


          padding-bottom: ${paddingBottom}px;
          width: 100%;
          min-height: 50px;

          border-radius: var(--border-radius);
          background-color: var(--highlight-soft);

          transition: ${
            isDragOver ? "padding-bottom var(--transition-time) ease" : "none"
          };
        `}
        onDragEnter={handleCardDragOverEnter}
        onDragLeave={handleCardDragOverLeave}
        onDragOver={enableDroppingCard}
        onDrop={handleDropCard}
      >
        {/* cards */}

        {cards.map((card, index) => (
          <BoardCard key={`board-card-${index}-${card.id}`} info={card} />
        ))}
      </div>

      {/* add card */}
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;

          p {
            cursor: pointer;
            text-align: center;
            text-decoration: underline;
            text-decoration-color: transparent;

            transition: text-decoration-color var(--transition-time) ease;

            :hover {
              text-decoration-color: inherit;
            }
          }
        `}
        onClick={createNewCard}
      >
        <p>add a card</p>
      </div>
    </div>
  );
};

export default BoardColumn;
