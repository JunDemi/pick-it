import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Home/contents.scss";
function Contents() {
    //인기순, 최신순 필터 state
    const [filter, setFilter] = useState<"pop" | "new">("pop");
    return (
        <>
            <div className="contents-top">

                <div className="contents-top-filter">
                    <button
                        onClick={() => setFilter("pop")}
                        className={filter === "pop" ? "filter-selected" : "filter-disabled"}
                    >인기순</button>
                    <button
                        onClick={() => setFilter("new")}
                        className={filter === "new" ? "filter-selected" : "filter-disabled"}
                    >최신순</button>
                </div>

                <form className="contents-top-search">
                    <input type="text" autoComplete="off" placeholder="월드컵 키워드 혹은 태그를 입력하여 검색하세요."/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>

                <Link to="/create-game" className="contents-top-create">
                    월드컵 생성
                </Link>

            </div>

            <div style={{height: "100px"}}/>
        </>
    );
}
export default Contents;