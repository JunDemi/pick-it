import React from "react";
import "../../../assets/Home/section.scss";
import { Link } from "react-router-dom";
import PCWorldcup from "./PCWorldcup";

function HomeSection() {
  //로컬 스토리지 게임 데이터
  const localGame = localStorage.getItem("game-data");
  const parseGameData = localGame ? JSON.parse(localGame) : null;



  return (
    <div className="home-section-container">
      {parseGameData && (
        <>
          <h1>진행중인 월드컵</h1>
          <div className="now-playing-game">
            <Link to={`/play-game/${parseGameData.GameId}`}>
              <div className="cover">
                <h2>{parseGameData.GameTitle}</h2>
              </div>
              <div className="img-wrapper">
                <img src={parseGameData.GameImage[0].filePath} alt="" />
                <img src={parseGameData.GameImage[1].filePath} alt="" />
              </div>
            </Link>
          </div>
        </>
      )}

      <h1>인기 월드컵</h1>
      <PCWorldcup />
    </div>
  );
}

export default HomeSection;
