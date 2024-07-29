import React, { useState, useRef } from "react";

function Step3Modify(imageList: {prop: File[]}) {
    return (
        <div className="modify-head">
            <h3>이미지 이름 수정</h3>
            <button>
                수정 완료 및 월드컵 생성
            </button>
        </div>
    );
}

export default Step3Modify;