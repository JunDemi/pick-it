import React, { useState } from "react";

function PopRank() {

    //참이면 1~10위, 거짓이면 11~20위를 표시
    const [rankPage, setRankPage] = useState<boolean>(true);

    return (
        <div className="banner-pop">
            <div className="banner-pop-title">
                <span>인기 월드컵 순위</span>
                <span onClick={() => setRankPage(prev => !prev)}>
                    &nbsp;&nbsp;
                    {rankPage ? "11 ~ 20위" : "1 ~ 10위"}
                    &nbsp;&nbsp;
                </span>
            </div>
            <div className="banner-pop-rank">
                {testData.slice(rankPage ? 0 : 10, rankPage ? 10 : 20).map((data, number) => (
                    <div key={number}>
                        <span>{rankPage ? number + 1 : number + 11}</span>
                        <p>{data.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PopRank;

const testData = [
    {
        id: "game_1",
        name: "월드컵 1"
    },
    {
        id: "game_2",
        name: "월드컵 2"
    },
    {
        id: "game_3",
        name: "월드컵 3"
    },
    {
        id: "game_4",
        name: "월드컵 4"
    },
    {
        id: "game_5",
        name: "월드컵 5"
    },
    {
        id: "game_6",
        name: "월드컵 6"
    },
    {
        id: "game_7",
        name: "월드컵 7"
    },
    {
        id: "game_8",
        name: "월드컵 8"
    },
    {
        id: "game_9",
        name: "월드컵 9"
    },
    {
        id: "game_10",
        name: "월드컵 10"
    },
    {
        id: "game_11",
        name: "월드컵 11"
    },
    {
        id: "game_12",
        name: "월드컵 12"
    },
    {
        id: "game_13",
        name: "월드컵 13"
    },
    {
        id: "game_14",
        name: "월드컵 14"
    },
    {
        id: "game_15",
        name: "월드컵 15"
    },
    {
        id: "game_16",
        name: "월드컵 16"
    },
    {
        id: "game_17",
        name: "월드컵 17"
    },
    {
        id: "game_18",
        name: "월드컵 18"
    },
    {
        id: "game_19",
        name: "월드컵 19"
    },
    {
        id: "game_20",
        name: "월드컵 20"
    },
];