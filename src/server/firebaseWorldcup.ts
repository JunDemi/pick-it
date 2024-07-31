import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { SendData } from "../types/Worldcup";

//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");

// 회원가입 데이터 DB저장. 테이블 이름 = users
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
