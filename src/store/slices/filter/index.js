import { createSlice } from "@reduxjs/toolkit";
import { spheresTypes } from "../../../dictionaries";
import { getCurrentTodoTypes } from "../../../functions";

function addTypeFunction(state, action) {
   const { item, todos } = action.payload;
   const currentTypes = getCurrentTodoTypes([...todos, item]);
   state.current = currentTypes;
   return state;
}

function updateTypeFunction(state, action) {
   const { item, todos } = action.payload;
   const currentTypes = getCurrentTodoTypes(todos.map((i) => i.id === item.id ? item : i));
   state.current = currentTypes;
   return state;
}

function addTypesFunction(state, action) {
   const types = action.payload;
   state.current = types;
   return state;
}


function removeTypeFunction(state, action) {
   const { id, todos } = action.payload;
   const currentTypes = getCurrentTodoTypes(todos.filter((i) => i.id !== id));
   state.current = currentTypes;
   return state;
}

function updateCurrentFilterFunction(state, action) {
   const { current } = state;
   const { operation, type } = action.payload;
   if (operation === 'add' && !current.includes(type)) {
      current.push(type);
      return state;
   }
   if (operation === 'remove' && current.includes(type)) {
      const newCurrent = current.filter((i) => i !== type);
      state.current = newCurrent;
      return state;
   }
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
      updateFilterType: updateTypeFunction,
      addFilterTypes: addTypesFunction,
      removeFilterType: removeTypeFunction,
      updateCurrentFilter: updateCurrentFilterFunction,
   },
});

export const { addFilterType, removeFilterType, addFilterTypes, updateFilterType, updateCurrentFilter } = todoSlice.actions;
export default todoSlice.reducer;