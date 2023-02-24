import { configureStore } from "@reduxjs/toolkit";
import todos from './slices/index';

export const store = configureStore({
   reducer: {
      todos,
   },
});

