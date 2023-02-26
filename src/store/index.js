import { configureStore } from "@reduxjs/toolkit";
import todos from './slices/todos/index';
import todo from "./slices/todo";
import filter from "./slices/filter";

export const store = configureStore({
   reducer: {
      todos,
      todo,
      filter,
   },
});

