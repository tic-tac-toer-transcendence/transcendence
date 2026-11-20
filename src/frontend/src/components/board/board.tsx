"use client"
import Field, { FieldState } from "@/components/board/field";
import { useReducer } from "react";
import { initBoardState } from "@/components/board/presets";

export interface BoardState {
  fields: FieldState[]
}

export type BoardAction =
	| { type: "claimCell", value: { fieldID: number, cellID: number, gender: "O" | "X" } } 

function boardReducer(state:BoardState, action:BoardAction) {
	switch (action.type) {
		case("claimCell"):
      return ({...state, fields: state.fields.map((field, index) => {
        if (index === action.value.fieldID) {
          return ({...field, cells: field.cells.map((cell, index) => {
            if (index === action.value.cellID)
              return ({...cell, claimed: action.value.gender})
            return cell;
          })})
        }
        return field;
      })})
	}	
}

export default function Board() {
  const [state, dispatch] = useReducer(boardReducer, initBoardState())

  return (
    <div className="bg-background rounded-2xl p-3 grid grid-rows-3 grid-cols-3 gap-3 w-full max-w-md">
      {state.fields.map((state, i) => {
        return <Field key={i} state={state} dispatch={dispatch} />
      })}
    </div>
  )
}

