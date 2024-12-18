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
  worldcupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  worldcupImages: WorldcupImage[];
}
//월드컵 이미지
export interface WorldcupImage {
  fileIndex: number;
  filePath: string;
  fileName: string;
}
//content.tsx에 마운트 될 데이터
export interface WorldcupList {
  worldcupId: string;
  worldcupInfo: SendData;
}
export interface ShareCommunity {
  title: string;
  subTitle: string;
}
export interface ImageRankData {
  fileName: string;
  filePath: string;
  winRate: number;
  userId: string[];
  updateAt: number;
}
//월드컵 수정 데이터
export interface UpdateWorldcupImages {
  fileIndex: number;
  filePath: string | null;
  fileName: string;
  previewImg: File | null;
}
