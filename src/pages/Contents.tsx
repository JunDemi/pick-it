import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Contents/contents.scss";
function Contents() {
    //인기순, 최신순 필터 state
    const [filter, setFilter] = useState<"pop" | "new">("pop");
    return (
        <section className="contents-container">
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
                    <input type="text" autoComplete="off" placeholder="월드컵 키워드 혹은 태그를 입력하여 검색하세요." />
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

            <div className="contents-section">
                {[...Array(36)].map((data) => (
                    <div className="contents-worldcup-card" key={data}>
                        <div className="card-thumbnail">
                            <img src="/images/introduce.png" alt="" />
                            <img src="/images/introduce.png" alt="" />
                        </div>
                        <h3>솔로 여가수 외모 순위</h3>
                        <p>대한민국 솔로 여가수 중 좋아하는 이상형을 선택해주세요.</p>
                        <div className="card-category">
                            <span>#여자가수</span>
                            <span>#솔로가수</span>
                            <span>#외모순위</span>
                        </div>
                        <div className="card-link">
                            <Link to=''>시작하기</Link>
                            <Link to=''>랭킹보기</Link>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
export default Contents;