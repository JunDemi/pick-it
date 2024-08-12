import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findSelectWorldcup } from "../server/firebaseWorldcup";
import "../assets/Contents/playGame.scss";

function PlayGame() {
  const [tournamentPopup, setTournamentPopup] = useState<boolean>(true);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();

  //토너먼트 범주 선택 후 데이터 불러오기
  const startGame = async (limit: number) => {
    setTournamentPopup(false);
    await fetchIdWorldcup().then(
      //반환된 promise를 로컬스토리지에 저장하는 과정
      (res) =>
        res && setGameData(res.gameId, res.gameInfo.worldcupImages, limit)
    );

    setTimeout(() => {
      setFetchLoading(false);
    }, 1000);
  };
  // 월드컵 아이디 값을 파라미터로 넘겨 선택 월드컵 데이터 fetch
  const fetchIdWorldcup = async () => {
    if (gameId) {
      const res = await findSelectWorldcup(gameId);
      return res;
    }
  };
  // 로컬스토리지 setItem함수
  const setGameData = (
    gameId: string,
    gameImage: {
      fileIndex: number;
      fileName: string;
      filePath: string;
    }[],
    limit: number
  ) => {
    //1단계. 이미지 배열 랜덤 배치 후 limit만큼 slice
    const slicedImage = gameImage
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
    //2단계. 매개변수 gameId와 상수 slicedImage를 로컬스토리지에 셋업
    localStorage.setItem(
      "game-data",
      JSON.stringify({
        GameId: gameId,
        GameData: slicedImage,
      })
    );
  };

  return fetchLoading ? (
    <>
      <div className="before-game-message">게임을 불러오는 중입니다...</div>
      {tournamentPopup && (
        <div className="tournament-select-popup">
          <button onClick={() => startGame(4)}>클릭</button>
        </div>
      )}
    </>
  ) : (
    <section className="game-container">
      <div className="game-title">
        <h1>게임 제목</h1>
      </div>
    </section>
  );
}

export default PlayGame;
