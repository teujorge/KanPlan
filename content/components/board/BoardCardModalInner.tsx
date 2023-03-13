/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CardInfo } from "./BoardCard";
import { useState } from "react";

const BoardCardModalInner = ({
  info,
  cardEdits,
  deleteCard,
  closeModal,
  cardStateChangeDebouncer,
}: {
  info: CardInfo;
  cardEdits: CardInfo;
  deleteCard: () => void;
  closeModal: () => void;
  cardStateChangeDebouncer: Function;
}) => {
  const [titleText, setTitleText] = useState(info.title);
  const [descText, setDescText] = useState(
    info.description ? info.description : ""
  );

  return (
    <div>
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
          value={titleText}
          onChange={(event) => {
            cardEdits.title = event.target.value;
            setTitleText(cardEdits.title);
            cardStateChangeDebouncer();
          }}
        />
        <textarea
          placeholder={info.description ? info.description : "description..."}
          value={descText}
          onChange={(event) => {
            cardEdits.description = event.target.value;
            setDescText(cardEdits.description);
            cardStateChangeDebouncer();
          }}
        />
        <input
          type="date"
          placeholder={info.date && info.date}
          onChange={(event) => {
            cardEdits.date = event.target.value;
            cardStateChangeDebouncer();
          }}
        />

        {info.colors.map((color, index) => (
          <input
            type="color"
            placeholder={color}
            onChange={(event) => {
              cardEdits.colors[index] = event.target.value;
              cardStateChangeDebouncer();
            }}
          />
        ))}
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
  );
};

export default BoardCardModalInner;
