import {
    addDoc,
    collection,
  } from "firebase/firestore";
  import { db } from "./firebase";

//월드컵 댓글 작성
export const addWorldcupComment = async(gameId: string, userId: string, commentText: string) => {
    await addDoc(collection(db, "worldcupComment"), {
        gameId: gameId,
        userId: userId,
        commentText: commentText,
        createAt: Date.now(),
    })
}