/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  innerComponent,
  outerComponent,
}: {
  isOpen: boolean;
  onClose: Function;
  innerComponent: JSX.Element;
  outerComponent: JSX.Element;
}) => {
  const bgElementRef = useRef<HTMLDivElement>(null);
  const [isRelativeToParent, setIsRelativeToParent] = useState(false);

  useEffect(() => {
    if (bgElementRef.current && bgElementRef.current.parentElement) {
      let parentComputedStyle = window.getComputedStyle(
        bgElementRef.current.parentElement
      );

      if (["fixed", "absolute"].includes(parentComputedStyle.position)) {
        setIsRelativeToParent(true);
      }
    }
  }, []);

  function closeModal() {
    onClose();
  }

  // if modal parent is not window/body position will be bad
  if (isRelativeToParent) return innerComponent;

  // show modal
  return (
    <>
      {outerComponent}

      {/* background */}
      <div
        ref={bgElementRef}
        css={css`
          /* overflow-y: auto; */
          z-index: 100;
          width: 100vw;
          height: 100vh;
          background-color: #00000075;
          backdrop-filter: blur(2px);

          position: fixed;
          top: 0px;
          left: 0px;

          display: flex;
          justify-content: center;
          align-items: center;

          opacity: ${isOpen ? 1 : 0};
          visibility: ${isOpen ? "visible" : "hidden"};
          transition: opacity 0.3s ease !important, visibility 0.4s ease !important;
        `}
        onClick={() => closeModal()}
      >
        {/* inner items */}
        <div
          css={css`
            position: relative;
            width: 70vw;
            max-width: 800px;
            max-height: 90vh;
            margin-inline: auto;
            padding: 30px;

            border-radius: var(--borderRadius);
            background-color: var(--primaryColor);
            box-shadow: 0px 0px 8px var(--shadowColor);

            form {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            }

            form input {
              width: 100%;
            }

            form textarea {
              width: 100%;
            }

            @media (max-width: 700px) {
              padding: 10px;
              max-width: 90vw;
              max-height: 90vh;
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {innerComponent}
        </div>
      </div>
    </>
  );
};

export default Modal;
