import React, { useEffect, useState } from "react";
import { getImageRankList } from "../server/firebaseWorldcup";
import { useParams } from "react-router-dom";
import { ImageRankData } from "../types/Worldcup";

function GameReview() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();
  // 불러온 데이터를 저장하는 상태 (gameId값이 잘못되었거나 랭킹이 아예 없을 경우 null을 할당하게 된다)
  const [imgRankData, setImgRankData] = useState<ImageRankData[] | null>(null);
  // 데이터 불러오기 로딩 동작
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getImageRankList(gameId && gameId).then((response) => {
      setImgRankData(response); //상태 할당
      setIsLoading(false); //로딩 중지
    });
  }, [gameId]);

  console.log(imgRankData);

  return isLoading ? (
    <div className="before-game-message">
      <h2>랭킹을 불러오는 중입니다...</h2>
      <div className="loading-spiner">
        <hr />
        <div />
      </div>
    </div>
  ) : (
    imgRankData ? <section>yes</section> : <p>랭킹 정보가 없습니다.</p>
  );
}

export default GameReview;
