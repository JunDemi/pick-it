import {
  addDoc,
  collection,
  doc,
  DocumentData,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");
const searchRef = collection(db, "searchWord");

//인기 월드컵 순위
export const dashboardPopRank = async () => {
  //view내림차순
  const worldcupQuery = query(worldcupRef, orderBy("view", "desc"), limit(20));
  //getDocs후 docs객체 할당
  const getData = await getDocs(worldcupQuery).then((res) => {
    return res.docs;
  });
  //클라이언트에 반환시킬 전체 결과값
  const results = getData.map((data) => {
    return { worldcupId: data.id, worldcupTitle: data.data()["worldcupTitle"] };
  });

  return results;
};

//인기 검색어 차트
export const dashboardPopSearch = async () => {
  const searchQuery = query(searchRef, where(documentId(), "==", "jHQEvoE65ejj42d6fBpZ"));
  //getDocs후 docs객체 할당
  const getData = await getDocs(searchQuery).then((res) => {
    return res.docs;
  });
  //클라이언트에 반환시킬 전체 결과값
  const results = getData.map((data) => {
    return data.data()["wordList"];
  });
  return results[0];
};
