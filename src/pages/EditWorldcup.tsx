import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findSelectWorldcup } from "../server/firebaseWorldcup";
import { DocumentData } from "firebase/firestore";

function EditWorldcup() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();
  //네비게이션
  const navigate = useNavigate();
  //로컬스토리지에 존재하는 유저 데이터
  const user = localStorage.getItem("pickit-user");
  const parseUser = user ? JSON.parse(user) : null;
  // 해당 ID의 월드컵 전체정보를 불러오는 상태
  const [gameData, setGameData] = useState<{
    gameId: string;
    gameInfo: DocumentData;
  } | null>(null);
  // 데이터 불러오기 로딩 동작
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //유저 체크
  useEffect(() => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    }
  }, [navigate, user]);
  useEffect(() => {
    if (gameId) {
      findSelectWorldcup(gameId)
        .then((result) => setGameData(result))
        .then(() => setIsLoading(false));
    }
  }, [gameId]);

  return !isLoading && gameData ? (
    gameData.gameInfo.userId === parseUser.UserId ? (
      <div>
        {gameData.gameInfo.userId}, {parseUser.UserId} 맞음
      </div>
    ) : (
      <div className="before-game-message">
        <h2>잘못된 접근입니다.</h2>
      </div>
    )
  ) : (
    <div className="before-game-message">
      <h2>데이터를 불러오는 중입니다...</h2>
      <div className="loading-spiner">
        <hr />
        <div />
      </div>
    </div>
  );
}
export default EditWorldcup;
