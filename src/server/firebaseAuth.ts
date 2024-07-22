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
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
//auth 세션불러오기
const auth = getAuth();
//파이어베이스 DB연동
const authRef = collection(db, "users");

// 파이어베이스 로그인
export const signInPickit = async (userId: string, userPw: string) => {
  await setPersistence(auth, browserLocalPersistence) //로그인 정보들을 브라우저 로컬에 등록
    .then(() => {
      return signInWithEmailAndPassword(auth, userId, userPw);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// 회원가입 닉네임 중복확인
export const nickNameCheck = async (nickName: string) => {
    const nickNameQuery = query(authRef, where("userNickName", "==", nickName));
    const result = await getDocs(nickNameQuery);
    //중복되지 않으면 닉네임을 반환
    return result.empty ?  nickName : "중복됨";
};


// 회원가입 아이디 중복확인
export const userIdCheck = async (userId: string) => {
    const userIdQuery = query(authRef, where("userId", "==", userId));
    const result = await getDocs(userIdQuery);

    //중복되지 않으면 ID를 반환
    return result.empty ?  userId : "중복됨";
};

// 회원가입 데이터 DB저장. 테이블 이름 = users
export const getAuthenticInfo = (
  keyId: string,
  userId: string,
  userNickName: string,
  userImg: string
) => {
  addDoc(collection(db, "users"), {
    keyId: keyId,
    userId: userId,
    userNickName: userNickName,
    userImg: userImg,
  });
};
