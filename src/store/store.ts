import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createWorldcup from "./worldcup/createWorldcup";

const worldcupReducers = combineReducers({
  createWorldcupReducer: createWorldcup,
});

const store = configureStore({
  reducer: worldcupReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;

export default store;
