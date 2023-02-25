import { createSlice } from "@reduxjs/toolkit";

function emptyCurrentTodoFn(state, action) {
   state = {}
   return state;
}

function editCurrentTodoFn(state, action) {
   state = action.payload;
   return state;
}
const todoSlice = createSlice({
   name: 'currentTodoSlice',
   initialState: {},
   reducers: {
      emptyCurrentTodo: emptyCurrentTodoFn,
      editCurrentTodo: editCurrentTodoFn,
   },
});

export const { emptyCurrentTodo, editCurrentTodo } = todoSlice.actions;
export default todoSlice.reducer;