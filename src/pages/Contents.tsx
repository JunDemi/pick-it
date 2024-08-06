import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import "../assets/Contents/contents.scss";
import { getWorldCupList } from "../server/firebaseWorldcup";
import { WorldcupList } from "../types/Worldcup";
function Contents() {
  //인기순, 최신순 필터 state
  const [filter, setFilter] = useState<"pop" | "new">("pop");
  //인터섹션 옵저버 훅
  const { ref, inView } = useInView();
  //리액트 쿼리 훅
  const {
    isLoading,
    data: worldcupList,
    fetchNextPage, //다음 페이지 불러오기
    hasNextPage, //다음 페이지 존재 여부
  } = useInfiniteQuery({
    queryKey: ["worldcup_list"],
    queryFn: ({ pageParam = 1 }) => getWorldCupList(pageParam), //pageParam값이 1일 때 DB에서는 8개의 데이터를 호출
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < allPages.length
        ? lastPage.length
        : lastPage.length + 1;
      // 마지막 페이지가 될 때까지 pageParam값을 1씩 증가 / 1 * 8 -> 2 * 16 -> 3 * 24 ...
    },
    staleTime: Infinity,
  });
  //ref에 닿으면 무한 스크롤 1회 작동
  useEffect(() => {
      if (inView) {
          setTimeout(() =>
              fetchNextPage()
              , 1000);
      }
  }, [inView]);
  return (
    <>
      <section className="contents-container">
        <div className="contents-top">
          <div className="contents-top-filter">
            <button
              onClick={() => setFilter("pop")}
              className={
                filter === "pop" ? "filter-selected" : "filter-disabled"
              }
            >
              인기순
            </button>
            <button
              onClick={() => setFilter("new")}
              className={
                filter === "new" ? "filter-selected" : "filter-disabled"
              }
            >
              최신순
            </button>
          </div>

          <form className="contents-top-search">
            <input
              type="text"
              autoComplete="off"
              placeholder="월드컵 키워드 혹은 태그를 입력하여 검색하세요."
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>

          <Link to="/create-game" className="contents-top-create">
            월드컵 생성
          </Link>
        </div>

        <div className="contents-section">
          {!isLoading && worldcupList ? (
            <>
              {
                //infinifyQuery를 쓰면 페이지 수에 따른 배열이 중첩되기 때문에 가장 마지막 순번의 배열을 map
                worldcupList.pages[worldcupList.pages.length - 1].map(
                  (data: WorldcupList) => (
                    <div
                      className="contents-worldcup-card"
                      key={data.worldcupId}
                    >
                      <div className="card-thumbnail">
                        <img
                          src={data.worldcupInfo.worldcupImages[0].filePath}
                          alt=""
                        />
                        <img
                          src={data.worldcupInfo.worldcupImages[1].filePath}
                          alt=""
                        />
                      </div>
                      <h3>{data.worldcupInfo.worldcupTitle}</h3>
                      <p>{data.worldcupInfo.worldcupDescription}</p>
                      <div className="card-category">
                        {data.worldcupInfo.category.map((text, index) => (
                          <span key={index}>#{text}</span>
                        ))}
                      </div>
                      <div className="card-link">
                        <Link to="">시작하기</Link>
                        <Link to="">랭킹보기</Link>
                      </div>
                    </div>
                  )
                )
              }
              <div ref={ref}></div>
            </>
          ) : (
            "로딩 중..."
          )}
        </div>
      </section>
    </>
  );
}
export default Contents;
