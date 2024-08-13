import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { SendData } from "../types/Worldcup";

//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");

// 월드컵 생성
export const getCreateWorldCup = async (argData: SendData) => {
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
    updateAt: currentTime,
    view: 0,
  });
};

//월드컵 리스트 불러오기(최신순)
export const getWorldCupList = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: {
    worldcupId: string;
    worldcupInfo: DocumentData;
  }[];
  currentPage: number;
  nextPage: number | null;
}> => {
  const LIMIT = 8; //클라이언트에 불러올 배열 개수

  const worldcupQuery = query(worldcupRef, orderBy("createAt", "desc"));
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
};

// 게임화면: 선택 월드컵 데이터 불러오기
export const findSelectWorldcup = async (id: string) => {
  const currentWorldcupRef = doc(worldcupRef, id);
  const findWorldcupData = await getDoc(currentWorldcupRef);
  if (findWorldcupData.exists()) {
    return {
      gameId: id,
      gameInfo: findWorldcupData.data(),
    };
  }
};

//
export const getCreateRankAndUpdateView = async (payloadData: {
  gameId: string;
  userId: string | null;
  fileIndex: number;
  fileName: string;
  filePath: string;
}) => {
  // //단일 월드컵 이미지 랭킹 데이터 추가
  // await addDoc(collection(db, "imageRank"), {
  //   gameId: payloadData.gameId,
  //   userId: payloadData.userId,
  //   fileIndex: payloadData.fileIndex,
  //   fileName: payloadData.fileName,
  //   filePath: payloadData.filePath,
  // });
  //조회 수 업데이트
  const updateRef = doc(db, "worldcup", payloadData.gameId);
  await updateDoc(updateRef, {
    view: increment(1), //조회수 1 증가
  });
};
