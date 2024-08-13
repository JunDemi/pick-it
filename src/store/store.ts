import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createWorldcup from "./worldcup/createWorldcup";
import finishWorldcup from "./worldcup/finishWorldcup";

//월드컵 생성
const createWorldcupReducers = combineReducers({
  createWorldcupReducer: createWorldcup,
});
//월드컵 우승자
const finishWorldcupReducers = combineReducers({
  finishWorldcupReducer: finishWorldcup,
});

const store = configureStore({
  reducer: {
    createWorldcupReducers: createWorldcupReducers,
    finishWorldcupReducers: finishWorldcupReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;

export default store;
