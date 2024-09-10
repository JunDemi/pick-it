import React, { useState } from "react";
import "../assets/Notice/notice.scss";
import { useQuery } from "@tanstack/react-query";
import { getNotice } from "../server/firebaseDashBoard";
import { getYYYYMMDD } from "../Utils/getYYYYMMDD";

function NoticePage() {
  //리액트 쿼리
  const { data: noticeData } = useQuery({
    queryKey: ["noticeAPI"],
    queryFn: getNotice,
  });
  //오름/내림차순 정렬
  const [isDesc, setIsDesc] = useState<boolean>(true);
  //테이플 페이지네이션 상태
  const [paging, setPaging] = useState<number>(0);
  return (
    <section className="notice-container">
      <h1 className="page-title">공지사항</h1>
      <button
        className="filter-button"
        onClick={() => setIsDesc((prev) => !prev)}
      >
        날짜
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className={isDesc ? "" : "rotate"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <table className="notice-table">
        <thead>
          <tr>
            <td>제목</td>
            <td>날짜</td>
          </tr>
        </thead>
        <tbody>
          {noticeData ? (
            <>
              {noticeData
                .sort((a, b) =>
                  isDesc ? b.createAt - a.createAt : a.createAt - b.createAt
                )
                .slice(paging * 6, paging * 6 + 6)
                .map((data) => (
                  <tr>
                    <td>{data.noticeTitle}</td>
                    <td>{getYYYYMMDD(data.createAt)}</td>
                  </tr>
                ))}
            </>
          ) : (
            <tr>
              <td colSpan={2}>공지사항이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      {noticeData && (
        <div className="notice-paging">
          {[...Array(Math.ceil(noticeData.length / 6))].map((_, index) => (
            <button
              key={index}
              onClick={() => setPaging(index)}
              className={paging === index ? "get-page" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default NoticePage;
