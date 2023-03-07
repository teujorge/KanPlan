/** @jsxImportSource @emotion/react */
import Head from "next/head";
import { css } from "@emotion/react";
import BoardColumn, { Column } from "../content/components/board/BoardColumn";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useState,
} from "react";

type BoardContextType = {
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
  draggingCard: RefObject<HTMLDivElement> | null;
  setDraggingCard: Dispatch<SetStateAction<RefObject<HTMLDivElement> | null>>;
};

export const BoardContext = createContext<BoardContextType>({
  columns: [],
  setColumns: () => {},
  draggingCard: null,
  setDraggingCard: () => {},
});

export default function Board() {
  const [columns, setColumns] = useState<Column[]>([
    {
      title: "col1",
      cards: [
        { id: "1", text: "hi" },
        { id: "2", text: "byebyebyebyebye byebyebyebyebye byebyebyebyebye" },
        { id: "3", text: "asdfasdf" },
      ],
    },
    {
      title: "col2",
      cards: [{ id: "4", text: "1111111" }],
    },
  ]);
  const [draggingCard, setDraggingCard] =
    useState<RefObject<HTMLDivElement> | null>(null);

  function createNewColumn() {
    const newColumn: Column = { title: "untitled", cards: [] };
    setColumns([...columns, newColumn]);
  }

  return (
    <BoardContext.Provider
      value={{
        columns: columns,
        setColumns: setColumns,
        draggingCard: draggingCard,
        setDraggingCard: setDraggingCard,
      }}
    >
      <div
        css={css`
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;

          margin: 10px;
          padding: 10px;
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
            {columns.map((col, index) => (
              <BoardColumn
                key={`board-column-${index}-${col.title}`}
                index={index}
              />
            ))}
            <div
              css={css`
                cursor: pointer;

                text-decoration: underline;
                text-decoration-color: transparent;

                transition: text-decoration-color 0.1s ease;

                :hover {
                  text-decoration-color: var(--foreground-color);
                }
              `}
              onClick={createNewColumn}
            >
              + new column
            </div>
          </div>
        </main>
      </div>
    </BoardContext.Provider>
  );
}
