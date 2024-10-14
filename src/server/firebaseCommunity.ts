import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import { WorldcupImage } from "../types/Worldcup";
import { ICommiunity } from "../types/Community";
import { getUserData } from "./firebaseAuth";
//파이어베이스 DB연동
const communityRef = collection(db, "community");

//커뮤니티 글 작성
export const getCreateCommunity = async (
  gameId: string,
  userId: string,
  title: string,
  subTitle: string,
  first: WorldcupImage,
  second: WorldcupImage
) => {
  //현재시간
  const currentTime = Date.now();
  //addDoc
  await addDoc(collection(db, "community"), {
    gameId: gameId,
    userId: userId,
    communityTitle: title,
    communitySubTitle: subTitle,
    firstImg: first,
    secondImg: second,
    heart: [],
    createAt: currentTime,
    updateAt: currentTime,
  });
};

//커뮤니티 리스트 불러오기
export const getCommunityList = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const LIMIT = 1;
  //최신순 정렬 쿼리
  const communityQuery = query(communityRef, orderBy("createAt", "desc"));
  //getDocs후 docs객체 할당
  const getData = await getDocs(communityQuery).then((res) => {
    return res.docs;
  });
  //클라이언트에 반환시킬 전체 결과값
  const results = getData.map(async (data) => {
    //유저ID값을 인자로 프로필 이미지와 닉네임을 반환하는 비동기 함수 호출
    const [userProfile, userName] = await getUserData(data.data()["userId"]);
    return {
      communityId: data.id,
      gameId: data.data()["gameId"],
      userId: data.data()["userId"],
      userProfile: userProfile,
      userName: userName,
      communityTitle: data.data()["communityTitle"],
      communitySubTitle: data.data()["communitySubTitle"],
      firstImg: data.data()["firstImg"],
      secondImg: data.data()["secondImg"],
      heart: data.data()["heart"],
      createAt: data.data()["createAt"],
      updateAt: data.data()["updateAt"],
    };
  });
  const setResults: ICommiunity[] = await Promise.all(results);

  return {
    data: setResults.slice(pageParam, pageParam + LIMIT),
    currentPage: pageParam,
    nextPage: pageParam + LIMIT < setResults.length ? pageParam + LIMIT : null,
  };
};
