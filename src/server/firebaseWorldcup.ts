import { addDoc, collection, DocumentData, getDocs, orderBy, query } from "firebase/firestore";
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
export const getWorldCupList = async({pageParam}: {pageParam: number}): Promise<{
  data: {
    worldcupId: string;
    worldcupInfo: DocumentData;
  }[];
  currentPage: number;
  nextPage: number | null;
}> => {

  const LIMIT = 8; //클라이언트에 불러올 배열 개수

   const worldcupQuery = query(
    worldcupRef,
    orderBy("createAt", "desc")
  );
  //getDocs후 docs객체 할당
  const getData = await getDocs(worldcupQuery).then((res) => {
    return res.docs;
  });
  const result = getData.map((data) => {
    return { worldcupId: data.id, worldcupInfo: data.data() };
  });

  //1초의 지연시간을 적용하고 promise값으로 리턴
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: result.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < result.length ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
}
