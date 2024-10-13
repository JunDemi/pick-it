import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  browserLocalPersistence,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { deleteProfileImg } from "./deleteStorage";

//auth 세션불러오기
const auth = getAuth();
//파이어베이스 DB연동
const authRef = collection(db, "users");

// 파이어베이스 로그인
export const signInPickit = async (userId: string, userPw: string) => {
  await setPersistence(auth, browserLocalPersistence) //로그인 정보들을 브라우저 로컬에 등록
    .then(() => {
      return signInWithEmailAndPassword(auth, userId, userPw);
    });
};
// 회원가입 데이터 DB저장. 테이블 이름 = users
export const getAuthenticInfo = (
  keyId: string,
  userId: string,
  userPw: string,
  userNickName: string,
  userImg: string
) => {
  addDoc(collection(db, "users"), {
    keyId: keyId,
    userId: userId,
    userPw: userPw,
    userNickName: userNickName,
    userImg: userImg,
    worldcupHistory: [], //월드컵 참여 기록
  });
};

/* userPopup 컴포넌트 사용자 조회 */
export const getUserData = async (userid: string) => {
  // 사용자 컬렉션에 매개변수로 넘겨받은 userid값을 문서 필드값 userId와 비교하여 사용자 조회
  const findRef = query(authRef, where("userId", "==", userid));
  const findIdDocs = await getDocs(findRef);

  const profileImgUrl: any = [];

  if (!findIdDocs.empty) {
    findIdDocs.forEach((doc) => {
      const profileImg = doc.data()["userImg"];
      const nickName = doc.data()["userNickName"];
      profileImgUrl.push(profileImg, nickName);
    });

    return profileImgUrl;
  }
};
// 월드컵 참여 기록을 위한 users 문서ID 조회
export const getUserDocumentId = async (userId: string) => {
  const findRef = query(authRef, where("userId", "==", userId));
  const findIdDocs = await getDocs(findRef).then((docRes) => {
    return docRes.docs;
  });

  const userDocId = findIdDocs.map((doc) => {
    return doc.id;
  });

  return userDocId[0];
};

//닉네임 중복확인
export const nickNameCheck = async (nickName: string) => {
  const nickNameQuery = query(authRef, where("userNickName", "==", nickName));
  const result = await getDocs(nickNameQuery);
  //중복되지 않으면 닉네임을 반환
  return result.empty ? nickName : "already-exist";
};

//아이디 중복확인
export const userIdCheck = async (userId: string) => {
  const userIdQuery = query(authRef, where("userId", "==", userId));
  const result = await getDocs(userIdQuery);

  //중복되지 않으면 ID를 반환
  return result.empty ? userId : "already-exist";
};

// 비밀번호 찾기
export const findPassword = async (userId: string) => {
  const userIdQuery = query(authRef, where("userId", "==", userId));
  const result = await getDocs(userIdQuery);

  return result.empty ? "empty" : String(result.docs[0].data()["userPw"]);
};

// 계정 삭제(회원탈퇴)
export const deleteMyProfile = async (userId: string) => {
  //현재 접속중인 계정 정보
  const me = auth.currentUser;
  //users테이블의 유저ID 조회
  const findRef = query(authRef, where("userId", "==", userId));
  //docs의 유저 데이터 추출하기
  const getProfile = await getDocs(findRef).then((docRes) => {
    return docRes.docs.find((data) => data.data()["userId"] === userId);
  });

  if (getProfile) {
    //프로필 이미지 삭제
    await deleteProfileImg(getProfile.data()["userImg"]);
    //firestore 유저 정보 삭제
    await deleteDoc(doc(db, "users", getProfile.id)).then(
      () => me && deleteUser(me)  //-> firebase Authentic 유저 정보 삭제
    );
  }
};

//사용자 재인증 메소드 (firebase는 사용자가 오래 전에 로그인하면 유저 데이터 업데이트 안 됨)
export const userReAuthtication = async (
  user: User,
  email: string,
  password: string
) => {
  //이메일 로그인 방식이기 때문에 EmailAuthProvider 사용
  const authCredential = EmailAuthProvider.credential(email, password);
  //reauthenticateWithCredential: 사용자 재인증 메소드
  const isAuthticSuccess = await reauthenticateWithCredential(
    user,
    authCredential
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  return isAuthticSuccess;
};

//userId를 매개변수로 유저의