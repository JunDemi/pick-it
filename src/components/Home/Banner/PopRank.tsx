import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { dashboardPopRank } from "../../../server/firebaseDashBoard";
import { Link } from "react-router-dom";

function PopRank() {
  //참이면 1~10위, 거짓이면 11~20위를 표시
  const [rankPage, setRankPage] = useState<boolean>(true);
  //리액트 쿼리
  const {
    data: popRankData,
    status,
    error,
  } = useQuery({
    queryKey: ["popRankApi"],
    queryFn: dashboardPopRank,
  });

  return (
    <div className="banner-pop">
      {status !== "pending" && !error && (
        <>
          <div className="banner-pop-title">
            <span>인기 월드컵 순위</span>
            {popRankData.length >= 11 && (
              <span onClick={() => setRankPage((prev) => !prev)}>
                {rankPage ? "11 ~ 20위" : "1 ~ 10위"}
              </span>
            )}
          </div>
          <div className="banner-pop-rank">
            {popRankData
              .slice(rankPage ? 0 : 10, rankPage ? 10 : 20)
              .map((data, number) => (
                <Link to={`/game-review/${data.worldcupId}`} key={number}>
                  <div>
                    <span>{rankPage ? number + 1 : number + 11}</span>
                    <p>{data.worldcupTitle}</p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
export default PopRank;