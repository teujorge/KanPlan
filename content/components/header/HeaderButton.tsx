/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Link from "next/link";

const HeaderButton = ({
  title,
  icon,
  href,
}: {
  title: string;
  icon: JSX.Element;
  href: string;
}) => {
  return (
    <Link href={href}>
      <div
        css={css`
          margin: 20px;
          padding: 10px;

          width: 210px;
          height: 50px;

          border-radius: var(--border-radius);
          background-color: red;
        `}
      >
        {title}
      </div>
    </Link>
  );
};

export default HeaderButton;
