import { BoardState } from "@/components/board/board"

export function heroBoardState(): BoardState {
  return {
    fields: [
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: "X", fieldKey: 0, cellKey: 0 }, { claimed: null, fieldKey: 0, cellKey: 1 }, { claimed: null, fieldKey: 0, cellKey: 2 },
          { claimed: null, fieldKey: 0, cellKey: 3 }, { claimed: "O", fieldKey: 0, cellKey: 4 }, { claimed: null, fieldKey: 0, cellKey: 5 },
          { claimed: null, fieldKey: 0, cellKey: 6 }, { claimed: null, fieldKey: 0, cellKey: 7 }, { claimed: "X", fieldKey: 0, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 1, cellKey: 0 }, { claimed: null, fieldKey: 1, cellKey: 1 }, { claimed: null, fieldKey: 1, cellKey: 2 },
          { claimed: null, fieldKey: 1, cellKey: 3 }, { claimed: null, fieldKey: 1, cellKey: 4 }, { claimed: null, fieldKey: 1, cellKey: 5 },
          { claimed: null, fieldKey: 1, cellKey: 6 }, { claimed: null, fieldKey: 1, cellKey: 7 }, { claimed: null, fieldKey: 1, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 2, cellKey: 0 }, { claimed: null, fieldKey: 2, cellKey: 1 }, { claimed: null, fieldKey: 2, cellKey: 2 },
          { claimed: null, fieldKey: 2, cellKey: 3 }, { claimed: null, fieldKey: 2, cellKey: 4 }, { claimed: null, fieldKey: 2, cellKey: 5 },
          { claimed: null, fieldKey: 2, cellKey: 6 }, { claimed: null, fieldKey: 2, cellKey: 7 }, { claimed: null, fieldKey: 2, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 3, cellKey: 0 }, { claimed: null, fieldKey: 3, cellKey: 1 }, { claimed: null, fieldKey: 3, cellKey: 2 },
          { claimed: null, fieldKey: 3, cellKey: 3 }, { claimed: null, fieldKey: 3, cellKey: 4 }, { claimed: null, fieldKey: 3, cellKey: 5 },
          { claimed: null, fieldKey: 3, cellKey: 6 }, { claimed: null, fieldKey: 3, cellKey: 7 }, { claimed: null, fieldKey: 3, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 4, cellKey: 0 }, { claimed: null, fieldKey: 4, cellKey: 1 }, { claimed: null, fieldKey: 4, cellKey: 2 },
          { claimed: null, fieldKey: 4, cellKey: 3 }, { claimed: null, fieldKey: 4, cellKey: 4 }, { claimed: null, fieldKey: 4, cellKey: 5 },
          { claimed: null, fieldKey: 4, cellKey: 6 }, { claimed: null, fieldKey: 4, cellKey: 7 }, { claimed: null, fieldKey: 4, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 5, cellKey: 0 }, { claimed: null, fieldKey: 5, cellKey: 1 }, { claimed: null, fieldKey: 5, cellKey: 2 },
          { claimed: null, fieldKey: 5, cellKey: 3 }, { claimed: null, fieldKey: 5, cellKey: 4 }, { claimed: null, fieldKey: 5, cellKey: 5 },
          { claimed: null, fieldKey: 5, cellKey: 6 }, { claimed: null, fieldKey: 5, cellKey: 7 }, { claimed: null, fieldKey: 5, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 6, cellKey: 0 }, { claimed: null, fieldKey: 6, cellKey: 1 }, { claimed: null, fieldKey: 6, cellKey: 2 },
          { claimed: null, fieldKey: 6, cellKey: 3 }, { claimed: null, fieldKey: 6, cellKey: 4 }, { claimed: null, fieldKey: 6, cellKey: 5 },
          { claimed: null, fieldKey: 6, cellKey: 6 }, { claimed: null, fieldKey: 6, cellKey: 7 }, { claimed: null, fieldKey: 6, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 7, cellKey: 0 }, { claimed: null, fieldKey: 7, cellKey: 1 }, { claimed: null, fieldKey: 7, cellKey: 2 },
          { claimed: null, fieldKey: 7, cellKey: 3 }, { claimed: null, fieldKey: 7, cellKey: 4 }, { claimed: null, fieldKey: 7, cellKey: 5 },
          { claimed: null, fieldKey: 7, cellKey: 6 }, { claimed: null, fieldKey: 7, cellKey: 7 }, { claimed: null, fieldKey: 7, cellKey: 8 },
        ]
      },
      {
        active: false,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 8, cellKey: 0 }, { claimed: null, fieldKey: 8, cellKey: 1 }, { claimed: null, fieldKey: 8, cellKey: 2 },
          { claimed: null, fieldKey: 8, cellKey: 3 }, { claimed: null, fieldKey: 8, cellKey: 4 }, { claimed: null, fieldKey: 8, cellKey: 5 },
          { claimed: null, fieldKey: 8, cellKey: 6 }, { claimed: null, fieldKey: 8, cellKey: 7 }, { claimed: null, fieldKey: 8, cellKey: 8 },
        ]
      },
    ]
  }
}

export function stepOneBoardState(): BoardState {
  return {
    fields: [
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 0, cellKey: 0 }, { claimed: null, fieldKey: 0, cellKey: 1 }, { claimed: null, fieldKey: 0, cellKey: 2 },
          { claimed: null, fieldKey: 0, cellKey: 3 }, { claimed: null, fieldKey: 0, cellKey: 4 }, { claimed: null, fieldKey: 0, cellKey: 5 },
          { claimed: null, fieldKey: 0, cellKey: 6 }, { claimed: null, fieldKey: 0, cellKey: 7 }, { claimed: null, fieldKey: 0, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 1, cellKey: 0 }, { claimed: null, fieldKey: 1, cellKey: 1 }, { claimed: null, fieldKey: 1, cellKey: 2 },
          { claimed: null, fieldKey: 1, cellKey: 3 }, { claimed: null, fieldKey: 1, cellKey: 4 }, { claimed: null, fieldKey: 1, cellKey: 5 },
          { claimed: null, fieldKey: 1, cellKey: 6 }, { claimed: null, fieldKey: 1, cellKey: 7 }, { claimed: null, fieldKey: 1, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 2, cellKey: 0 }, { claimed: null, fieldKey: 2, cellKey: 1 }, { claimed: null, fieldKey: 2, cellKey: 2 },
          { claimed: null, fieldKey: 2, cellKey: 3 }, { claimed: null, fieldKey: 2, cellKey: 4 }, { claimed: null, fieldKey: 2, cellKey: 5 },
          { claimed: null, fieldKey: 2, cellKey: 6 }, { claimed: null, fieldKey: 2, cellKey: 7 }, { claimed: null, fieldKey: 2, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 3, cellKey: 0 }, { claimed: null, fieldKey: 3, cellKey: 1 }, { claimed: null, fieldKey: 3, cellKey: 2 },
          { claimed: null, fieldKey: 3, cellKey: 3 }, { claimed: null, fieldKey: 3, cellKey: 4 }, { claimed: null, fieldKey: 3, cellKey: 5 },
          { claimed: null, fieldKey: 3, cellKey: 6 }, { claimed: null, fieldKey: 3, cellKey: 7 }, { claimed: null, fieldKey: 3, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 4, cellKey: 0 }, { claimed: null, fieldKey: 4, cellKey: 1 }, { claimed: null, fieldKey: 4, cellKey: 2 },
          { claimed: null, fieldKey: 4, cellKey: 3 }, { claimed: null, fieldKey: 4, cellKey: 4 }, { claimed: null, fieldKey: 4, cellKey: 5 },
          { claimed: null, fieldKey: 4, cellKey: 6 }, { claimed: null, fieldKey: 4, cellKey: 7 }, { claimed: null, fieldKey: 4, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 5, cellKey: 0 }, { claimed: null, fieldKey: 5, cellKey: 1 }, { claimed: null, fieldKey: 5, cellKey: 2 },
          { claimed: null, fieldKey: 5, cellKey: 3 }, { claimed: null, fieldKey: 5, cellKey: 4 }, { claimed: null, fieldKey: 5, cellKey: 5 },
          { claimed: null, fieldKey: 5, cellKey: 6 }, { claimed: null, fieldKey: 5, cellKey: 7 }, { claimed: null, fieldKey: 5, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 6, cellKey: 0 }, { claimed: null, fieldKey: 6, cellKey: 1 }, { claimed: null, fieldKey: 6, cellKey: 2 },
          { claimed: null, fieldKey: 6, cellKey: 3 }, { claimed: null, fieldKey: 6, cellKey: 4 }, { claimed: null, fieldKey: 6, cellKey: 5 },
          { claimed: null, fieldKey: 6, cellKey: 6 }, { claimed: null, fieldKey: 6, cellKey: 7 }, { claimed: null, fieldKey: 6, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 7, cellKey: 0 }, { claimed: null, fieldKey: 7, cellKey: 1 }, { claimed: null, fieldKey: 7, cellKey: 2 },
          { claimed: null, fieldKey: 7, cellKey: 3 }, { claimed: null, fieldKey: 7, cellKey: 4 }, { claimed: null, fieldKey: 7, cellKey: 5 },
          { claimed: null, fieldKey: 7, cellKey: 6 }, { claimed: null, fieldKey: 7, cellKey: 7 }, { claimed: null, fieldKey: 7, cellKey: 8 },
        ]
      },
      {
        active: true,
        claimed: null,
        cells: [
          { claimed: null, fieldKey: 8, cellKey: 0 }, { claimed: null, fieldKey: 8, cellKey: 1 }, { claimed: null, fieldKey: 8, cellKey: 2 },
          { claimed: null, fieldKey: 8, cellKey: 3 }, { claimed: null, fieldKey: 8, cellKey: 4 }, { claimed: null, fieldKey: 8, cellKey: 5 },
          { claimed: null, fieldKey: 8, cellKey: 6 }, { claimed: null, fieldKey: 8, cellKey: 7 }, { claimed: null, fieldKey: 8, cellKey: 8 },
        ]
      },
    ]
  }
}
