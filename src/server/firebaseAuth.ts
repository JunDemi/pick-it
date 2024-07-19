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
  const resultArray: any = [];
    const nickNameQuery = query(authRef);
    const result = await getDocs(nickNameQuery); //문서화
    result.docs.map((data) => {
      resultArray.push(data.data().userNickName);
    });
    //배열안에 입력한 닉네임이 있으면 false
    return resultArray.includes(nickName) ? false : true;
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
