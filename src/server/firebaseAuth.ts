import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

//파이어베이스 DB연동
const authRef = collection(db, "users");

// 회원가입 데이터 DB저장. 테이블 이름 = users
export const getAuthenticInfo = (keyId: string, userId: string, userNickName: string, userImg: string) => {
    addDoc(collection(db, "users"), {
        keyId: keyId,
        userId: userId,
        userNickName: userNickName,
        userImg: userImg
    });
  };