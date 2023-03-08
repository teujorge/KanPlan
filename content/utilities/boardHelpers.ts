import { Column } from "../components/board/BoardColumn";

type Location = {
  row: number;
  col: number;
};

export function findCardsInColumnsOld({
  columns,
  card1Id: cardId1,
  card2Id: cardId2,
}: {
  columns: Column[];
  card1Id: string;
  card2Id?: string;
}) {
  let card1Loc: Location | undefined = undefined;
  let card2Loc: Location | undefined = undefined;

  for (let c = 0; c < columns.length; c++) {
    for (let r = 0; r < columns[c].cards.length; r++) {
      // find card 1
      if (cardId1 === columns[c].cards[r].id) {
        card1Loc = { col: c, row: r };
      }

      // find card 2
      if (cardId2 === columns[c].cards[r].id) {
        card2Loc = { col: c, row: r };
      }

      if (card1Loc && card2Loc) {
        break;
      }
    }
  }

  return { card1Loc, card2Loc };
}

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

  // move it to specified index
  tempCards[finalLoc.col!].cards.splice(finalLoc.row, 0, removedCard);

  return tempCards;
}
