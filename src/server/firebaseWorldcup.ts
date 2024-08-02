import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { SendData } from "../types/Worldcup";

//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");

// 월드컵 생성
export const getCreateWorldCup = async(argData: SendData) => {
  //현재시간
  const currentTime = Date.now();
  //addDoc
  await addDoc(collection(db, "worldcup"), {
    userId: argData.userId,
    worldcupTitle: argData.worldcupTitle,
    worldcupDescription: argData.worldcupDescription,
    tournamentRange: argData.tournamentRange,
    category: argData.category,
    worldcupImages: argData.worldcupImages,
    createAt: currentTime,
    updateAt: currentTime
  });
};

//월드컵 리스트 불러오기(최신순)
export const getWorldCupList = async(pageParam:number) => {
  const resultArray: any[] = [];
   const worldcupQuery = query(
    worldcupRef,
    orderBy("createAt", "desc"),
    limit(pageParam * 8)
  );
  const result = await getDocs(worldcupQuery); //문서화
  result.docs.map((data) => {
    resultArray.push({ worldcupId: data.id, worldcupInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
  });
  return resultArray;
}
