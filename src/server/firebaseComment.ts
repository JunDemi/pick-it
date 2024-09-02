import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

//파이어베이스 DB연동
const worldcupCommentRef = collection(db, "worldcupComment");
const authRef = collection(db, "users");
//월드컵 댓글 불러오기
export const getWorldcupCommentList = async (gameId: string) => {
  //댓글 쿼리
  const commentQuery = query(worldcupCommentRef, where("gameId", "==", gameId));
  //getDocs후 docs객체 할당
  const getData = await getDocs(commentQuery).then((res) => {
    return res.docs;
  });

  const resultData = getData.map((doc) => {
    return {
      userId: doc.data()["userId"],
      commentText: doc.data()["commentText"],
      createAt: doc.data()["createAt"],
    };
  });
  return resultData;
};

//댓글 목록의 유저 ID값을 통해 닉네임 및 이미지 불러오기
export const getCommentUser = async (
  commentData: {
    userId: string;
    commentText: string;
    createAt: number;
  }[]
) => {
  const commentUserInfo = commentData.map(async (data) => {
    // 사용자 컬렉션에 매개변수로 넘겨받은 userid값을 문서 필드값 userId와 비교하여 사용자 조회
    const findRef = query(authRef, where("userId", "==", data.userId));
    const findIdDocs = await getDocs(findRef);
    if (findIdDocs.empty) {
      return {
        userId: "",
        nickName: "",
        profileImg: "",
      };
    } else {
      //유저 ID와 일치한 유저테이블 탐색
      const isExistUser = findIdDocs.docs.find((doc) => doc.data()["userId"] === data.userId);
      if (isExistUser) {
        return {
          userId: data.userId,
          nickName: isExistUser.data()["userNickName"],
          profileImg: isExistUser.data()["userImg"],
        };
      } else {
        return {
          userId: "",
          nickName: "",
          profileImg: "",
        };
      }
    }
  });

  return Promise.all(commentUserInfo);
};

//월드컵 댓글 작성
export const addWorldcupComment = async (
  gameId: string,
  userId: string,
  commentText: string
) => {
  await addDoc(collection(db, "worldcupComment"), {
    gameId: gameId,
    userId: userId,
    commentText: commentText,
    createAt: Date.now(),
  });
};
