import React, { useEffect, useState } from "react";

function Step1() {
    return (
        <div className="create-game-step12">
            <h3 className="steps-page-number">1 / 3</h3>
            <h1 className="steps-page-title">월드컵 제목 및 설명</h1>
            <p className="steps-page-desc">월드컵 제목과 설명을 작성해주세요.</p>

            <form className="step12-form">
                <input type="text" autoComplete="off" placeholder="제목을 입력해주세요." />
                <textarea autoComplete="off" placeholder="월드컵을 설명하는 내용을 입력해주세요." />
                {/* 해당 버튼 클릭 시 전역 상태로 페이지 넘버 전환 되게 온클릭 함수 만들어야 함*/}
                <button className="next-step-button">
                    다음 단계로
                </button>
            </form>
        </div>
    );
}

export default Step1;