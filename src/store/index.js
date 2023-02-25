import { configureStore } from "@reduxjs/toolkit";
import todos from './slices/todos/index';

export const store = configureStore({
   reducer: {
      todos,
   },
});

