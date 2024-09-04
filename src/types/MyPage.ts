import { DocumentData } from "firebase/firestore";

export interface MyPageDataType {
  gameId: string;
  gameInfo: DocumentData;
}
export interface MyWorldcupCommentType {
  commentId: string;
  gameId: string;
  userId: string;
  commentText: string;
  createAt: number;
}