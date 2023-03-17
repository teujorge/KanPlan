import { Pages } from "../../pages/_app";

interface PageLayout {
  showHeader: boolean;
}

export function getPageLayout(page: Pages): PageLayout {
  switch (page) {
    case Pages.index:
      return { showHeader: false };

    case Pages.home:
      return { showHeader: true };

    case Pages.board:
      return { showHeader: true };

    case Pages.workspace:
      return { showHeader: true };

    case Pages.settings:
      return { showHeader: true };
  }
}
