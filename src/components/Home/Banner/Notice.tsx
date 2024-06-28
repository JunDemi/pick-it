import React from "react";
import { Link } from "react-router-dom";
function Notice() {
    return (
        <div className="banner-dashboard-notice">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
                공지
            </div>
            <h3>
                {testData[0].title}
            </h3>
            <h4>
                {testData[0].createAt}
            </h4>
            <Link to="/">+ 더 보기</Link>
        </div>
    );
}
export default Notice;

const testData = [
    {
        id: 1,
        title: "[버그수정]월드컵 생성 UI 업데이트",
        createAt: "2024.06.28"
    },
    {
        id: 2,
        title: "공지 2",
        createAt: "2024.06.26"
    },
    {
        id: 3,
        title: "공지 3",
        createAt: "2024.06.24"
    }
];