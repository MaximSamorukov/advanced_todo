import { createSlice } from "@reduxjs/toolkit";

function addTodoHandler(state, action) {
   const todo = action.payload;
   state.push(todo);
}

function removeTodoHandler(state, action) {
   const { id } = action.payload;
   state.filter((item) => item !== id);
}

function editTodoHandler(state, action) {
   const newTodo = action.payload;
   state.map((item) => {
      if(item.id === newTodo.id) {
         return newTodo;
      }
      return item;
   })
}
const todoSlice = createSlice({
   name: 'todoSlice',
   initialState: [],
   reducers: {
      addTodo: addTodoHandler,
      removeTodo: removeTodoHandler,
      editTodo: editTodoHandler,
   },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;