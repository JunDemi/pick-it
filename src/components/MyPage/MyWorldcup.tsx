import React, { useState } from "react";
import { MyPageDataType } from "../../types/MyPage";
import { Link } from "react-router-dom";
import { compareTime } from "../../Utils/compareTime";

function MyWorldcup(props: { data: MyPageDataType[] }) {
  const [filter, setFilter] = useState<"new" | "pop">("new");

  return props.data.length === 0 ? (
    <div className="mypage-no-data">생성하신 월드컵이 없습니다.</div>
  ) : (
    <div className="mypage-worldcup-container">
      <div className="top-filter">
        <button
          onClick={() => setFilter("new")}
          className={filter === "new" ? "filter-selected" : "filter-disabled"}
        >
          최신순
        </button>
        <button
          onClick={() => setFilter("pop")}
          className={filter === "pop" ? "filter-selected" : "filter-disabled"}
        >
          인기순
        </button>
      </div>
      <div className="mypage-card-container">
        {props.data
          .sort((dataA, dataB) =>
            filter === "pop"
              ? dataB.gameInfo.view - dataA.gameInfo.view
              : dataB.gameInfo.createAt - dataA.gameInfo.createAt
          )
          .map((item) => (
            <div className="card" key={item.gameId}>
              <div className="img-wrapper">
                <img src={item.gameInfo.worldcupImages[3].filePath} alt="" />
                <img src={item.gameInfo.worldcupImages[6].filePath} alt="" />
              </div>
              <div className="card-wrapper">
                <div className="group-one">
                  <h2>{item.gameInfo.worldcupTitle}</h2>
                  <p>{item.gameInfo.worldcupDescription}</p>
                </div>
                <div className="group-two">
                  <h3>조회수: {item.gameInfo.view}회</h3>
                  <div className="category">
                    {item.gameInfo.category.map((text: string, n: number) => (
                      <span key={n}>#{text}</span>
                    ))}
                  </div>
                  <h4>작성일: {compareTime(item.gameInfo.createAt)}</h4>
                  <div className="card-links">
                    <Link to="">수정하기</Link>
                    <Link to={`../game-review/${item.gameId}`}>랭킹보기</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyWorldcup;
