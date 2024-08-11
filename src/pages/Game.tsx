import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import { findSelectWorldcup } from "../server/firebaseWorldcup";

function Game() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id } = useParams();

  // 월드컵 아이디 값을 파라미터로 넘겨 선택 월드컵 데이터 fetch
  const fetchIdWorldcup = async () => {
    if (id !== undefined) {
      const res = await findSelectWorldcup(id);

      return res;
    }
  };

  //useSWR 활용한 비동기 데이터 패칭 함수 실행 및 실시간 선택 월드컵 데이터 감지
  const { data, isLoading, error } = useSWR(
    "api/findSelectWorldCup",
    fetchIdWorldcup
  );

  return <div>Hello</div>;
}

export default Game;
