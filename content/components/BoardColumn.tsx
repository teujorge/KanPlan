/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, useContext } from "react";
import BoardCard, { CardInfo } from "./BoardCard";
import { BoardContext } from "../../pages/board";

const BoardColumn = ({ column }: { column: number }) => {
  const { cards, setCards } = useContext(BoardContext);

  function enableDroppingCard(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  const handleDropCard = (event: DragEvent<HTMLDivElement>) => {
    // obtain dropped card info
    const cardInfo: CardInfo = JSON.parse(event.dataTransfer.getData("info"));
    console.log(cardInfo);

    // find dropped card in cards list
    let droppedCardColumn = -1;
    let droppedCardRow = -1;
    for (let c = 0; c < cards.length; c++) {
      for (let r = 0; r < cards[c].length; r++) {
        if (cardInfo.id === cards[c][r].id) {
          droppedCardColumn = c;
          droppedCardRow = r;
          break;
        }
      }
    }

    // update dropped card list based on where it was dropped
    let tempCards = cards;
    const removedCard = tempCards[droppedCardColumn].splice(droppedCardRow, 1);
    tempCards[column].push(removedCard[0]);
    setCards([...tempCards]);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin: 10px;
        padding: 10px;
        width: 200px;
        min-height: 100px;

        background-color: #ffffff25;
      `}
      onDragOver={enableDroppingCard}
      onDrop={handleDropCard}
    >
      {cards[column]?.length > 0 ? (
        cards[column].map((card) => <BoardCard info={card} />)
      ) : (
        <p>no cards</p>
      )}
    </div>
  );
};

export default BoardColumn;
