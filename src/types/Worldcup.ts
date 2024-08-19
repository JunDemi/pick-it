//월드컵 생성 리듀서 
export interface CreateWorldCup {
  worldcupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  pageStep: 1 | 2 | 3;
}
//월드컵 생성 1단계
export interface step1DataType {
  worldCupTitle: string;
  worldcupDescription: string;
}
//백엔드에 월드컵 생성 데이터를 넘기기 위해 취합
export interface SendData {
  userId: string;
  nickName: string;
  worldcupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  worldcupImages: {
    fileIndex: number;
    filePath: string;
    fileName: string;
  }[];
}
//content.tsx에 마운트 될 데이터
export interface WorldcupList {
  worldcupId: string;
  worldcupInfo: SendData;
}
//월드컵 이후 1등 데이터 리듀서
export interface FinishWorldcup {
  gameId: string;
  userId: string | null;
  fileIndex: number;
  fileName: string;
  filePath: string;
}
export interface ImageRankData {
  fileName: string;
  filePath: string;
  winRate: number;
}
