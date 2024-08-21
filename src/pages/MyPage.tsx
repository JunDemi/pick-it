import React from "react";
import "../assets/MyPage/myPage.scss";
import { Link } from "react-router-dom";

function MyPage() {
  const remainData = localStorage.getItem("game-data");


  if(remainData) console.log(JSON.parse(remainData));
  return (
    <div className="mypage-container">
      <aside className="mypage-aside">
        <div className="aside-profile">
          <img src="/images/introduce.png" alt="" />
          <h2>태연</h2>
          <Link to="">프로필 수정</Link>
          <div className="my-played">
            <div>
              <h3>12</h3>
              <p>내 월드컵</p>
            </div>
            <div>
              <h3>34</h3>
              <p>참여</p>
            </div>
            <div>
              <h3>6</h3>
              <p>댓글</p>
            </div>
          </div>
        </div>
        {remainData && (
          <div className="aside-remain-game">
            <h2>아직 끝나지 않은 게임이 있어요!</h2>
            <div className="game-info">
              <div className="img-wrapper">
                <img src={JSON.parse(remainData).GameImage[0].filePath} alt="" />
                <img src={JSON.parse(remainData).GameImage[1].filePath} alt="" />
              </div>
              <div>
                <h3>{JSON.parse(remainData).GameTitle}</h3>
              </div>
            </div>
            <Link to={`/play-game/${JSON.parse(remainData).GameId}`}>
              <button>플레이</button>
            </Link>
          </div>
        )}
      </aside>
      <section className="mypage-section"></section>
    </div>
  );
}

export default MyPage;
