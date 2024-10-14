import React, { useEffect, useState } from "react";
import PopRank from "../components/Home/Banner/PopRank";
import "../assets/Community/community.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommunityList, getHeartClick } from "../server/firebaseCommunity";
import { useInView } from "react-intersection-observer";

function Community() {
  //로그인 유저 불러오기
  const localUser = localStorage.getItem('pickit-user');
  const userId = localUser ? JSON.parse(localUser).UserId : null;
  //인터섹션 옵저버 훅
  const { ref, inView } = useInView();
  //리액트 쿼리 훅
  const {
    status,
    data: communityList,
    fetchNextPage, //다음 페이지 불러오기,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["community_api"],
    queryFn: ({ pageParam }) => getCommunityList({ pageParam }), //getNextPageParam작성할 경우 pageParam값이 인자값으로 전달,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage, //fetchNextPage가 작동하면 nextPage로 pageParam값 증가
  });

  //무한스크롤 시 로딩 상태
  const [newLoading, setNewLoading] = useState<boolean>(false);
  //ref에 닿으면 무한 스크롤 1회 작동
  useEffect(() => {
    //스크롤 끝에 닿고 다음 페이지가 존재할 경우 로딩 및 0.6초뒤 페이지 불러오기
    if (inView && hasNextPage) {
      setNewLoading(true);
      setTimeout(() => {
        fetchNextPage();
      }, 500);
    } else {
      setNewLoading(false);
    }
  }, [inView, fetchNextPage]);

  //좋아요 하트 클릭 이벤트
  const heartClick = async(communityId: string, isExist: boolean) => {
    //비로그인시 경고
    if(userId){
      //유저ID와 게시글ID를 전달
      await getHeartClick(userId, communityId, isExist);
      refetch();
    }else{
      alert('로그인 해야 이용할 수 있습니다.');
    }
  }
  return status === "pending" ? (
    <div className="community-loading">
      <h2>게시글을 불러오는 중입니다...</h2>
      <div className="loading-spiner">
        <hr />
        <div />
      </div>
    </div>
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
            {page.data.map(
              (items) =>
                items && (
                  <div key={items.communityId} className="community-card">
                    <div className="card-head">
                      <img
                        src={
                          items.userProfile === "default"
                            ? "/images/user.png"
                            : items.userProfile
                        }
                        alt=""
                      />
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
                          onClick={() => heartClick(items.communityId, items.heart.includes(userId) ? true : false)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={items.heart.includes(userId) ? "#ff0000" : "none"}
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
                            <h3>
                              INVU 뮤비 보면 이런 고민 못하지...너무 이쁘던데
                            </h3>
                            <p>1일 전</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </main>
        ))}
        <div ref={ref}>
          {newLoading && (
            <div className="infi-scroll-wrapper">
            <div className="loading-spiner">
              <hr />
              <div />
            </div>
            </div>
          )}
        </div>
      </div>
      <div className="pop-section">
        <PopRank />
      </div>
    </section>
  );
}

export default Community;
