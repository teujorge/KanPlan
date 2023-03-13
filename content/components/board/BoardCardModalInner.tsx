/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CardInfo } from "./BoardCard";
import { debounce } from "../../utilities/debounce";

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
  let colorSelector: string = "";

  const colorChangeDebouncer = debounce(() => {
    if (cardEdits.colors) cardEdits.colors.push(colorSelector);
    else cardEdits.colors = [colorSelector];
    cardStateChangeDebouncer();
  }, 1000);

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
          onChange={(event) => {
            cardEdits.title = event.target.value;
            cardStateChangeDebouncer();
          }}
        />
        <textarea
          placeholder={info.description ? info.description : "description..."}
          onChange={(event) => {
            cardEdits.description = event.target.value;
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
        <input
          type="color"
          placeholder={info.colors && info.colors[0]}
          onChange={(event) => {
            colorSelector = event.target.value;
            colorChangeDebouncer();
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
  );
};

export default BoardCardModalInner;
