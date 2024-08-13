import { createSlice } from "@reduxjs/toolkit";
import { FinishWorldcup } from "../../types/Worldcup";

const initialState: FinishWorldcup = {
  gameId: "",
  fileIndex: 0,
  fileName: "",
  filePath: ""
};

const finishWorldcupSlice = createSlice({
  name: "finishWorldcup",
  initialState,
  reducers: {
    // playGame 클라이언트에서 입력값을 넘겨받은 후 게임Id, 우승한 데이터의 이미지 정보 업데이트
    getWinnerImage: (state, action) => {
        state.gameId = action.payload.gameId;
        state.fileIndex = action.payload.fileIndex;
        state.fileName = action.payload.fileName;
        state.filePath = action.payload.filePath;
      },
  },
});

export default finishWorldcupSlice.reducer;
export const { getWinnerImage } = finishWorldcupSlice.actions;
