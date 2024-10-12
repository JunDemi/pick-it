import React from "react";
import PopRank from "../components/Home/Banner/PopRank";
import "../assets/Community/community.scss";

function Community() {
  return (
    <section className="community-container">
      <div className="community-section">
        {[...Array(5)].map((v, i) => (
          <div key={i} className="community-card">
            <div className="card-head">
              <img src="/images/user.png" alt="" />
              <div>
                <h2>결승 고르기 빡시네...의견좀 ㅜ.ㅜ</h2>
                <p>민혀기</p>
              </div>
            </div>
            <div className="card-question">
              두 앨범 모두 태연 갓띵곡이라 결승에서 만났는데 두 곡 다 너무
              좋아서... 하나만 선택해야 한다면 어떤 차이점이 있을까요?
            </div>
            <div className="card-images">
              <div>
                <img src="/images/introduce.png" alt="" />
                <p>INVU</p>
              </div>
              <div>
                <img src="/images/introduce.png" alt="" />
                <p>Perpose</p>
              </div>
            </div>
            <div className="card-hearts">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ff0000"
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
                민혀기님 외에 19명이 좋아합니다
              </div>
              <span>댓글 모두 보기</span>
            </div>
            <div className="card-comments">
                {[...Array(3)].map((x, j) => (
                    <div key={j} className="comment-row">
                        <div className="profile">
                            <img src="/images/user.png" alt=""/>
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
      </div>
      <div className="pop-section">
        <PopRank />
      </div>
    </section>
  );
}

export default Community;
