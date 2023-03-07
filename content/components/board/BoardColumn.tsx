/** @jsxImportSource @emotion/react */
import BoardCard, { CardInfo } from "./BoardCard";
import { BoardContext } from "../../../pages/board";
import { css } from "@emotion/react";
import { DragEvent, useContext } from "react";
import {
  findCardsInColumns,
  columnsAfterMove,
} from "../../utilities/boardHelpers";

export type Column = {
  title: string;
  cards: CardInfo[];
};

const BoardColumn = ({ index }: { index: number }) => {
  const { columns, setColumns } = useContext(BoardContext);

  function deleteColumn() {
    const tempColumns = columns;
    tempColumns.splice(index, 1);
    setColumns([...tempColumns]);
  }

  function enableDroppingCard(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDropCard(event: DragEvent<HTMLDivElement>) {
    console.log("column drop");

    // obtain dropped card info
    const cardId = event.dataTransfer.getData("id");

    // find dropped card in cards list
    const { card1Loc: draggedCardLoc } = findCardsInColumns({
      columns: columns,
      card1Id: cardId,
    });

    // update dropped card list based on where it was dropped
    let newColumns = columnsAfterMove({
      columns: columns,
      initialLoc: draggedCardLoc!,
      finalLoc: { col: index, row: columns[index].cards.length - 1 },
    });
    setColumns([...newColumns]);
  }

  let cards: CardInfo[] = columns[index].cards;

  return (
    <div
      css={css`
        user-select: none;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin: 10px;
        padding-bottom: 30px;
        width: 200px;
        min-height: 100px;

        border-radius: var(--border-radius);
        background-color: var(--highlight-soft);
      `}
      onDragOver={enableDroppingCard}
      onDrop={handleDropCard}
    >
      {/* title */}
      <h3
        css={css`
          width: 80%;
          border-bottom: 2px solid;
        `}
      >
        {columns[index].title}
      </h3>

      {/* cards */}
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <BoardCard key={`board-card-${index}-${card.id}`} info={card} />
        ))
      ) : (
        <p>no cards</p>
      )}

      {/* settings */}
      <div
        css={css`
          cursor: pointer;

          position: absolute;
          top: 6px;
          right: 6px;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 20px;
          height: 30px;

          border-radius: var(--border-radius);

          transition: background-color 0.2s ease;

          :hover {
            background-color: var(--highlight-soft);
          }
        `}
        onClick={deleteColumn}
      >
        X
      </div>
    </div>
  );
};

export default BoardColumn;
