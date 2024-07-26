import { createSlice } from "@reduxjs/toolkit";
import { CreateWorldCup } from "../../types/Worldcup";

const initialState: CreateWorldCup = {
  worldcupTitle: "",
  worldcupName: "",
  tournamentRange: 0,
  category: [],
  images: [],
};

const createWorldcupSlice = createSlice({
  name: "createWorldcup",
  initialState,
  reducers: {
    insertImage(state, payload: any) {
      state.images.push(payload);
    },
  },
});

export default createWorldcupSlice.reducer;
export const { insertImage } = createWorldcupSlice.actions;
