import { BoardState } from "@/types/board"

export function initBoardState(): BoardState {
  return {
    turn: null,
    player: null,
    status: "waiting",
    board: [
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 0, id: 0 }, { claimed: null, fieldId: 0, id: 1 }, { claimed: null, fieldId: 0, id: 2 },
          { claimed: null, fieldId: 0, id: 3 }, { claimed: null, fieldId: 0, id: 4 }, { claimed: null, fieldId: 0, id: 5 },
          { claimed: null, fieldId: 0, id: 6 }, { claimed: null, fieldId: 0, id: 7 }, { claimed: null, fieldId: 0, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 1, id: 0 }, { claimed: null, fieldId: 1, id: 1 }, { claimed: null, fieldId: 1, id: 2 },
          { claimed: null, fieldId: 1, id: 3 }, { claimed: null, fieldId: 1, id: 4 }, { claimed: null, fieldId: 1, id: 5 },
          { claimed: null, fieldId: 1, id: 6 }, { claimed: null, fieldId: 1, id: 7 }, { claimed: null, fieldId: 1, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 2, id: 0 }, { claimed: null, fieldId: 2, id: 1 }, { claimed: null, fieldId: 2, id: 2 },
          { claimed: null, fieldId: 2, id: 3 }, { claimed: null, fieldId: 2, id: 4 }, { claimed: null, fieldId: 2, id: 5 },
          { claimed: null, fieldId: 2, id: 6 }, { claimed: null, fieldId: 2, id: 7 }, { claimed: null, fieldId: 2, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 3, id: 0 }, { claimed: null, fieldId: 3, id: 1 }, { claimed: null, fieldId: 3, id: 2 },
          { claimed: null, fieldId: 3, id: 3 }, { claimed: null, fieldId: 3, id: 4 }, { claimed: null, fieldId: 3, id: 5 },
          { claimed: null, fieldId: 3, id: 6 }, { claimed: null, fieldId: 3, id: 7 }, { claimed: null, fieldId: 3, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 4, id: 0 }, { claimed: null, fieldId: 4, id: 1 }, { claimed: null, fieldId: 4, id: 2 },
          { claimed: null, fieldId: 4, id: 3 }, { claimed: null, fieldId: 4, id: 4 }, { claimed: null, fieldId: 4, id: 5 },
          { claimed: null, fieldId: 4, id: 6 }, { claimed: null, fieldId: 4, id: 7 }, { claimed: null, fieldId: 4, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 5, id: 0 }, { claimed: null, fieldId: 5, id: 1 }, { claimed: null, fieldId: 5, id: 2 },
          { claimed: null, fieldId: 5, id: 3 }, { claimed: null, fieldId: 5, id: 4 }, { claimed: null, fieldId: 5, id: 5 },
          { claimed: null, fieldId: 5, id: 6 }, { claimed: null, fieldId: 5, id: 7 }, { claimed: null, fieldId: 5, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 6, id: 0 }, { claimed: null, fieldId: 6, id: 1 }, { claimed: null, fieldId: 6, id: 2 },
          { claimed: null, fieldId: 6, id: 3 }, { claimed: null, fieldId: 6, id: 4 }, { claimed: null, fieldId: 6, id: 5 },
          { claimed: null, fieldId: 6, id: 6 }, { claimed: null, fieldId: 6, id: 7 }, { claimed: null, fieldId: 6, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 7, id: 0 }, { claimed: null, fieldId: 7, id: 1 }, { claimed: null, fieldId: 7, id: 2 },
          { claimed: null, fieldId: 7, id: 3 }, { claimed: null, fieldId: 7, id: 4 }, { claimed: null, fieldId: 7, id: 5 },
          { claimed: null, fieldId: 7, id: 6 }, { claimed: null, fieldId: 7, id: 7 }, { claimed: null, fieldId: 7, id: 8 },
        ]
      },
      {
        active: null,
        claimed: null,
        cells: [
          { claimed: null, fieldId: 8, id: 0 }, { claimed: null, fieldId: 8, id: 1 }, { claimed: null, fieldId: 8, id: 2 },
          { claimed: null, fieldId: 8, id: 3 }, { claimed: null, fieldId: 8, id: 4 }, { claimed: null, fieldId: 8, id: 5 },
          { claimed: null, fieldId: 8, id: 6 }, { claimed: null, fieldId: 8, id: 7 }, { claimed: null, fieldId: 8, id: 8 },
        ]
      },
    ]
  }
}

