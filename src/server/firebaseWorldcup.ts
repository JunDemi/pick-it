import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { ImageRankData, SendData } from "../types/Worldcup";
import { getUserDocumentId } from "./firebaseAuth";

//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");
const imageRankRef = collection(db, "imageRank");

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
export const getWorldCupList = async (
  filter: "pop" | "new",
  {
    pageParam,
  }: {
    pageParam: number;
  }
): Promise<{
  data: {
    worldcupId: string;
    worldcupInfo: DocumentData;
  }[];
  currentPage: number;
  nextPage: number | null;
}> => {
  const LIMIT = 8; //클라이언트에 불러올 배열 개수

  //filter에 따라 view내림차순 혹은 최신순 정렬
  const worldcupQuery = query(
    worldcupRef,
    orderBy(filter === "new" ? "createAt" : "view", "desc")
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
    }, 700);
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
  } else {
    return null;
  }
};

//단일 월드컵에 대한 이미지 랭킹. 각 이미지의 우승 횟수를 업데이트
export const getCreateRankAndUpdateView = async (payloadData: {
  gameId: string;
  userId: string | null;
  fileIndex: number;
  fileName: string;
  filePath: string;
}) => {
  //해당 게임 아이디를 가진 데이터 업데이트
  const updateRef = doc(db, "worldcup", payloadData.gameId);
  //단일 이미지 랭킹 존재 여부를 확인
  const rankFindQuery = query(
    imageRankRef,
    where(
      "findKey",
      "==",
      payloadData.gameId + "-" + String(payloadData.fileIndex)
    ) //아이디와 파일인덱스 식별키가 동일한 데이터 추출
  );
  const imageRankFinder = await getDocs(rankFindQuery);
  //해당 아이디를 가진 데이터가 존재하지 않으면 addDoc, 존재하면 updateDoc
  if (imageRankFinder.empty) {
    await addDoc(collection(db, "imageRank"), {
      findKey: payloadData.gameId + "-" + String(payloadData.fileIndex), //아이디와 파일인덱스 식별
      gameId: payloadData.gameId,
      userId: payloadData.userId ? [payloadData.userId] : "", //비회원일경우 비어있는값
      fileIndex: payloadData.fileIndex,
      fileName: payloadData.fileName,
      filePath: payloadData.filePath,
      winRate: 1,
      updateAt: Date.now(),
    });
  } else {
    //이미지 랭킹 데이터의 ID값 불러오기
    const findId = imageRankFinder.docs.find(
      (data) =>
        data.data().findKey ===
        payloadData.gameId + "-" + String(payloadData.fileIndex)
    )?.id;
    //undefined가 아니면
    if (findId) {
      const updateImageRankRef = doc(db, "imageRank", findId);
      //이미지 랭킹 우승 횟수 업데이트
      await updateDoc(updateImageRankRef, {
        //비회원일경우 비어있는값. (arrayUnion은 기존 배열에 새로 추가. 배열 내에 동일한 id가 있다면 추가되지 않음)
        userId: arrayUnion(payloadData.userId ? payloadData.userId : ""),
        winRate: increment(1), //우승 횟수 1 증가
        updateAt: Date.now(),
      });
    }
  }
  //로그인 중일 경우 해당 회원의 월드컵 참여 기록 업데이트
  if(payloadData.userId){
    //firebaseAuth.ts 함수: 해당 유저의 문서 ID를 불러옴
    const myDocId = await getUserDocumentId(payloadData.userId);
    //해당 문서 ID를 가진 테이블 매칭 후 업데이트
    const authRef = doc(db, "users", myDocId);
    await updateDoc(authRef, {
      //worldcupHistory배열 컬럼 추가. { 게임아이디, 참여일 }
      worldcupHistory: arrayUnion({
        gameId: payloadData.gameId,
        playedAt: Date.now()
      }),
    });
  }
  //조회 수 업데이트
  await updateDoc(updateRef, {
    view: increment(1), //조회수 1 증가
  });
};

//매개변수 = 월드컵 게임 ID(url파라미터), 이미지 랭킹 데이터 불러오기
export const getImageRankList = async (
  gameID: string
): Promise<ImageRankData[] | null> => {
  //쿼리
  const rankFindQuery = query(
    imageRankRef,
    where("gameId", "==", gameID),
    orderBy("updateAt", "desc")
  );
  const imageRankDocs = await getDocs(rankFindQuery);
  //잘못된 파라미터 주소나 월드컵 랭킹이 아예 없는 경우
  if (imageRankDocs.empty) {
    return null;
  } else {
    const result = imageRankDocs.docs.map((data) => {
      return {
        fileName: data.data().fileName,
        filePath: data.data().filePath,
        userId: data.data().userId,
        winRate: data.data().winRate,
        updateAt: data.data().updateAt,
      };
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }
};