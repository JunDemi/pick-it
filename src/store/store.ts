import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createWorldcup from "./worldcup/createWorldcup";

//월드컵 생성
const createWorldcupReducers = combineReducers({
  createWorldcupReducer: createWorldcup,
});

const store = configureStore({
  reducer: {
    createWorldcupReducers: createWorldcupReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;

export default store;
