/** @jsxImportSource @emotion/react */
import Head from "next/head";
import { css } from "@emotion/react";
import BoardColumn from "../content/components/BoardColumn";
import { CardInfo } from "../content/components/BoardCard";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type BoardContextType = {
  cards: CardInfo[][];
  setCards: Dispatch<SetStateAction<CardInfo[][]>>;
};

export const BoardContext = createContext<BoardContextType>({
  cards: [],
  setCards: () => {},
});

export default function Board() {
  const [cards, setCards] = useState<CardInfo[][]>([
    [
      { id: "1", text: "hi" },
      { id: "2", text: "byebyebyebyebye" },
    ],
    [],
    [],
    [],
    [],
  ]);

  return (
    <BoardContext.Provider
      value={{
        cards: cards,
        setCards: setCards,
      }}
    >
      <div
        css={css`
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;

          margin: 10px;
          padding: 10px;

          width: 100vw;
          height: 100vh;
        `}
      >
        <Head>
          <title>KanPlan Board</title>
          <meta name="description" content="Your KanPlan Board Title" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h2>Your KanPlan Board Title</h2>

          {/* all columns */}
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
            `}
          >
            {cards.map((col, index) => (
              <BoardColumn column={index} />
            ))}
          </div>
        </main>
      </div>
    </BoardContext.Provider>
  );
}
