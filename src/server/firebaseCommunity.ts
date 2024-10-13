import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { WorldcupImage } from "../types/Worldcup";
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
export const getCommunityList = async({pageParam}: {
  pageParam: number;
}) => {
  const LIMIT = 2;
  //최신순 정렬 쿼리
  const communityQuery = query(
    communityRef,
    orderBy("createAt", "desc")
  );
  //getDocs후 docs객체 할당
  const getData = await getDocs(communityQuery).then((res) => {
    return res.docs;
  });
   //클라이언트에 반환시킬 전체 결과값
   const results = getData.map((data) => {
    return { communityId: data.id, communityInfo: data.data() };
  });

  return {
    data: results.slice(pageParam, pageParam + LIMIT),
    currentPage: pageParam,
    nextPage:
      pageParam + LIMIT < results.length ? pageParam + LIMIT : null,
  };
}