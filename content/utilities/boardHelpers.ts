import { CardInfo } from "../components/board/BoardCard";
import { Column } from "../components/board/BoardColumn";

type Location = {
  row: number;
  col: number;
};

export function findCardsInColumns({
  columns,
  ids,
}: {
  columns: Column[];
  ids: string[];
}): (Location | undefined)[] {
  let locations: (Location | undefined)[] = ids.map(() => undefined);

  outerLoop: for (let c = 0; c < columns.length; c++) {
    for (let r = 0; r < columns[c].cards.length; r++) {
      // loop through all card ids
      for (let i = 0; i < ids.length; i++) {
        // find card i
        if (ids[i] === columns[c].cards[r].id) {
          locations[i] = { col: c, row: r };
          break;
        }
      }

      // stop if all locations have been found
      let allLocationsFound = true;
      locations.forEach((loc) => {
        if (!loc) allLocationsFound = false;
      });
      if (allLocationsFound) break outerLoop;
    }
  }

  return locations;
}

export function columnsAfterMove({
  columns,
  initialLoc,
  finalLoc,
}: {
  columns: Column[];
  initialLoc: Location;
  finalLoc: Location;
}) {
  let tempCards = [...columns];

  const removedCard = tempCards[initialLoc.col].cards.splice(
    initialLoc.row,
    1
  )[0];

  // prevent dragged card from going +1 down due to removed array item
  let rowIndex = finalLoc.row;
  // only occurs in same column movement
  if (initialLoc.col === finalLoc.col) {
    // only occurs when moving down the column
    if (initialLoc.row < finalLoc.row) rowIndex--;
  }

  // move it to specified index
  tempCards[finalLoc.col!].cards.splice(rowIndex, 0, removedCard);

  return tempCards;
}
