/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { AppContext, Pages } from "../../../pages/_app";
import { useContext } from "react";
import HeaderButton from "./HeaderButton";
import HeaderDropdown from "./HeaderDropdown";
import ColumnSvg from "../../../public/svgs/ColumnSvg";
import GearSvg from "../../../public/svgs/GearSvg";
import HouseSvg from "../../../public/svgs/HouseSvg";

const Header = () => {
  const { page } = useContext(AppContext);

  return (
    <>
      {/* space occupying div */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          min-width: 300px;
          max-width: 300px;

          /* height: 20px; */
          /* background-color: red; */
        `}
      />

      {/* visible header */}
      <div
        css={css`
          z-index: 10;
          position: fixed;
          top: 40px;
          left: 40px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          width: 250px;
          height: calc(100% - 80px);
          max-height: 1000px;

          border: 2px solid aqua;
          border-radius: var(--border-radius);
          background-color: var(--background-color);
        `}
      >
        {/* section top */}
        <div>
          <HeaderButton href={Pages.home} title="Home" icon={HouseSvg} />
          <HeaderDropdown title="Workspaces" icon={ColumnSvg} links={[]} />
          <HeaderDropdown title="Boards" icon={ColumnSvg} links={[]} />
        </div>

        {/* section bot */}
        <div>
          <HeaderButton href={Pages.settings} title="Settings" icon={GearSvg} />
        </div>
      </div>
    </>
  );
};

export default Header;
