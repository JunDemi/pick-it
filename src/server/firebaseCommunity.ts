import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { WorldcupImage } from "../types/Worldcup";

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
    communitySubTtile: subTitle,
    firstImg: first,
    secondImg: second,
    heart: [],
    createAt: currentTime,
    updateAt: currentTime,
  });
};
