import { createSlice } from "@reduxjs/toolkit";
import { spheresTypes } from "../../../dictionaries";

function addTypeFunction(state, action) {
   const type = action.payload;
   const { current } = state;
   if (!current.includes(type)) {
      const newCurrent = current.push(type);
      state.current = newCurrent;
      return state;
   }
   return state;
}

function addTypesFunction(state, action) {
   const types = action.payload;
   state.current = types;
   return state;
}


function removeTypeFunction(state, action) {
   const type = action.payload;
   const { current } = state;
   const newCurrent = current.filter((i) => i !== type)
   state.current = newCurrent;
   return state;
}

const original = Object.keys(spheresTypes).filter((i) => i !== 'SELECT');

const initialState = {
   original,
   current: [],
}

const todoSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      addFilterType: addTypeFunction,
      addFilterTypes: addTypesFunction,
      removeFilterType: removeTypeFunction,
   },
});

export const { addFilterType, removeFilterType, addFilterTypes } = todoSlice.actions;
export default todoSlice.reducer;