import React, { useEffect, useState } from "react";
import {
  findSelectWorldcup,
  getImageRankList,
} from "../server/firebaseWorldcup";
import { useParams } from "react-router-dom";
import { ImageRankData } from "../types/Worldcup";
import { DocumentData } from "firebase/firestore";
import "../assets/Contents/gameReview.scss";

function GameReview() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();
  // 이미지 랭킹정보를 저장하는 상태 (gameId값이 잘못되었거나 랭킹이 아예 없을 경우 null을 할당하게 된다)
  const [imgRankData, setImgRankData] = useState<ImageRankData[] | null>(null);
  // 해당 ID의 월드컵 전체정보를 불러오는 상태
  const [allData, setAllData] = useState<{
    gameId: string;
    gameInfo: DocumentData;
  } | null>(null);
  // 데이터 불러오기 로딩 동작
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (gameId) {
      //파이어베이스 데이터 요청을 순차대로 진행하기 위해 프로미스체이닝 코드 작성
      getImageRankList(gameId) // 1.이미지 랭킹 조회 데이터 요청
        .then((imgRes) => {
          setImgRankData(imgRes); //상태 할당 1
        })
        .then(() => // 2. 해당 월드컵의 전체 정보 조회 데이터 요청 
          findSelectWorldcup(gameId).then((dataRes) => setAllData(dataRes)) //상태 할당 2
        )
        .then(() => setIsLoading(false)); // 3.로딩 종료
    }
  }, [gameId]);

  console.log(allData);

  return isLoading ? (
    <div className="before-game-message">
      <h2>랭킹을 불러오는 중입니다...</h2>
      <div className="loading-spiner">
        <hr />
        <div />
      </div>
    </div>
  ) : allData ? (
    <div className="game-review-container">
      <aside className="game-review-info">
        <div className="info-name">
          <h1>게임 정보</h1>
          <div className="thunbnail">
            <div>
              <img src={allData.gameInfo.worldcupImages[3].filePath} alt=""/>
              <img src={allData.gameInfo.worldcupImages[6].filePath} alt=""/>
            </div>
            {allData.gameInfo.worldcupTitle}
          </div>
        </div>
      </aside>
      <section className="game-review-rank">
        section
      </section>
    </div>
  ) : (
    <div className="before-game-message">랭킹 정보를 불러오지 못했습니다.</div>
  );
}

export default GameReview;
