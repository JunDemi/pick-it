import {
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
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
  //단일 문서 내 배열에 검색어를 전부 저장할 거기 때문에 문서 ID값을 직접 입력
  const searchQuery = query(
    searchRef,
    where(documentId(), "==", "jHQEvoE65ejj42d6fBpZ")
  );
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

//인기 카테고리 차트
export const dashboardPopCategory = async () => {
  const searchQuery = query(worldcupRef);
  //getDocs후 docs객체 할당
  const getData = await getDocs(searchQuery).then((res) => {
    return res.docs;
  });
  //클라이언트에 반환시킬 전체 결과값
  const results = getData.map((data) => {
    return data.data()["category"];
  });

  //2중첩 배열이기 때문에 flat()메소드로 평탄화
  return results.flat();
};
