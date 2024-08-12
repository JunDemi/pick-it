import React from "react";
import { useParams } from "react-router-dom";
import { findSelectWorldcup } from "../server/firebaseWorldcup";
import { useQuery } from "@tanstack/react-query";

function PlayGame() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id } = useParams();

  // 월드컵 아이디 값을 파라미터로 넘겨 선택 월드컵 데이터 fetch
  const fetchIdWorldcup = async () => {
    if (id) {
      const res = await findSelectWorldcup(id);
      return res;
    }
  };

  const { data: gameData, status } = useQuery({
    queryKey: ["api-findSelectWorldCup"], //쿼리 식별자
    queryFn: fetchIdWorldcup,
    staleTime: Infinity, //데이터가 stale한 상태여도 값이 실시간으로 변화하지 않게
  });
  console.log(gameData);
  return status === "pending" ? <div>게임을 불러오고 있습니다...</div> :
    <section className="game-container">
      <div className="game-title"></div>
    </section>
}

export default PlayGame;
