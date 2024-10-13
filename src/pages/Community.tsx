import React, { useState } from "react";
import PopRank from "../components/Home/Banner/PopRank";
import "../assets/Community/community.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommunityList } from "../server/firebaseCommunity";
import { getUserData } from "../server/firebaseAuth";

function Community() {
  //리액트 쿼리 훅
  const {
    status,
    error,
    data: communityList,
    fetchNextPage, //다음 페이지 불러오기,
    isFetchingNextPage, //다음 페이지 불러오는 중
    refetch,
  } = useInfiniteQuery({
    queryKey: ["community_api"],
    queryFn: ({ pageParam }) => getCommunityList({ pageParam }), //getNextPageParam작성할 경우 pageParam값이 인자값으로 전달,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage, //fetchNextPage가 작동하면 nextPage로 pageParam값 증가
  });


  return status === "pending" ? (
    <div>로딩중...</div>
  ) : status === "error" ? (
    <div>에러</div>
  ) : (
    <section className="community-container">
      <div className="community-section">
        <h1 className="community-how-to">
          &#8251; 월드컵 게임 화면 안에 있는 '공유하기'를 통해 커뮤니티 글을
          작성할 수 있습니다. &#8251;
        </h1>
        {communityList.pages.map((page, index) => (
        <main key={page.currentPage}>
        {page.data.map((items) => items && (
          <div key={items.communityId} className="community-card">
            <div className="card-head">
              <img src={items.userProfile === "default" ? "/images/user.png" : items.userProfile} alt="" />
              <div>
                <h2>{items.communityTitle}</h2>
                <p>{items.userName}</p>
              </div>
            </div>
            <div className="card-question">
              {items.communitySubTitle}
            </div>
            <div className="card-images">
              <div>
                <img src={items.firstImg.filePath} alt="" />
                <p>{items.firstImg.fileName}</p>
              </div>
              <div>
              <img src={items.secondImg.filePath} alt="" />
              <p>{items.secondImg.fileName}</p>
              </div>
            </div>
            <div className="card-hearts">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#ff0000"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                좋아요 {items.heart.length}개
              </div>
              <span>댓글 모두 보기</span>
            </div>
            <div className="card-comments">
              {[...Array(3)].map((x, j) => (
                <div key={j} className="comment-row">
                  <div className="profile">
                    <img src="/images/user.png" alt="" />
                    민혀기
                  </div>
                  <div className="text">
                    <h3>INVU 뮤비 보면 이런 고민 못하지...너무 이쁘던데</h3>
                    <p>1일 전</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
          </main>
        ))}
      </div>
      <div className="pop-section">
        <PopRank />
      </div>
    </section>
  );
}

export default Community;
