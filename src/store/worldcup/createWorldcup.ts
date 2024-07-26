import { createSlice } from "@reduxjs/toolkit";
import { CreateWorldCup } from "../../types/Worldcup";

const initialState: CreateWorldCup = {
  worldCupTitle: "",
  worldcupDescription: "",
  tournamentRange: 0,
  category: [],
  images: [],
  pageStep: 1,
};

const createWorldcupSlice = createSlice({
  name: "createWorldcup",
  initialState,
  reducers: {
    // step1 클라이언트에서 사용자 입력값을 넘겨받은 후 월드컵 제목, 설명 데이터 업데이트
    updateStep1: (state, action) => {
      state.worldCupTitle = action.payload.worldCupTitle;
      state.worldcupDescription = action.payload.worldcupDescription;
    },
    // step1 입력값의 올바른 저장을 확인 후 다음 pageStep값을 2로 증가시키는 함수
    scrollStep2: (state, action) => {
      if (state.worldCupTitle !== "" && state.worldcupDescription !== "") {
        state.pageStep = action.payload;
      }
    },
    insertImage: (state, action) => {
      state.images.push(action.payload);
    },
  },
});

export default createWorldcupSlice.reducer;
export const { insertImage, updateStep1, scrollStep2 } =
  createWorldcupSlice.actions;
