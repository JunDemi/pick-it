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
import { ICharts, INotice } from "../types/Banner";
//파이어베이스 DB연동
const worldcupRef = collection(db, "worldcup");
const searchRef = collection(db, "searchWord");
const noticeRef = collection(db, "notice");

//인기 월드컵 순위 (상단 랭킹)
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

//인기 카테고리 월드컵 (하단 슬라이드)
export const dashboardPopWolrdcup = async (categoryCountArray: ICharts[]) => {
  //전역 상태값인 카테고리 배열의 값이 채워지면
  if (categoryCountArray.length > 0) {
    const categoryLoop = categoryCountArray.map(async (data) => {
      //쿼리 - 배열에 해당 값을 찾을 때: array-contains
      const categoryQuery = query(
        worldcupRef,
        where("category", "array-contains", data.name)
      );
      //getDocs후 docs객체 할당
      const getData = await getDocs(categoryQuery).then((res) => {
        return res.docs;
      });
      //클라이언트에 반환시킬 전체 결과값
      const results = getData.map((doc) => {
        return { worldcupId: doc.id, worldcupInfo: doc.data() };
      });

      return results;
    });

    //비동기작업 완료될 때 까지 기다리고 결과값을 반환
    return Promise.all(categoryLoop).then((results) => {
      //반환할 결과값은 2중첩 배열이므로 flat
      const flatResult = results.flat();

      //flat을 한 후 해당 배열의 ID값 중복을 제거
      const uniqueNames = new Set();
      const filterList = flatResult.filter((item) => {
        if (uniqueNames.has(item.worldcupId)) {
          return false; // 중복된 이름이면 제외
        } else {
          uniqueNames.add(item.worldcupId); // 고유한 이름은 추가
          return true;
        }
      });
      //20개까지만 클라이언트에 전송
      return filterList.slice(0, 20);
    });
  } else {
    return null;
  }
};

//공지사항 불러오기
export const getNotice = async () => {
  //단일 문서 내 배열에 검색어를 전부 저장할 거기 때문에 문서 ID값을 직접 입력
  const noticeQuery = query(noticeRef);
  const getData = await getDocs(noticeQuery).then((data) => {
    return data.docs;
  });
  const results: INotice[] = getData.map((doc) => {
    return {
      noticeId: doc.id,
      noticeTitle: doc.data()["noticeTitle"],
      noticeDescription: doc.data()["noticeDescription"],
      createAt: doc.data()["createAt"],
    };
  });

  return results;
};
