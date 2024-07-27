import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Step2() {
  //select 토글 상탸
  const [selectToggle, setSelectToggle] = useState<boolean>(false);
  //select option value상태
  const [optionValue, setOptionValue] =
    useState<string>("토너먼트를 선택해주세요.");
  //리액트 훅 폼
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });
  //카테고리 텍스트 하나를 담는 상태
  const [category, setCategory] = useState<string>("");
  //설정된 카테고리들을 담는 배열
  const [categoryArray, setCategoryArray] = useState<string[]>([]);

  //카테고리 등록 핸들러
  const handleCategory = (data: any) => {
    console.log(data);
  };
  return (
    <div className="create-game-step12">
      <h3 className="steps-page-number">2 / 3</h3>
      <h1 className="steps-page-title">월드컵 토너먼트 및 카테고리 설정</h1>
      <p className="steps-page-desc">
        월드컵 토너먼트 범위를 선택하고 카테고리를 3개 이하로 추가해주세요.
      </p>

      <form className="step12-form" onSubmit={handleSubmit(handleCategory)}>
        <div className="select-tournament">
          {optionValue}
          <motion.svg
            onClick={() => setSelectToggle((prev) => !prev)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            animate={selectToggle ? { rotateZ: 180 } : {}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </motion.svg>
          {selectToggle && (
            <div className="tournament-options">
              <span
                onClick={() => {
                  setOptionValue("8강");
                  setSelectToggle(false);
                }}
              >
                8강
              </span>
              <span
                onClick={() => {
                  setOptionValue("16강");
                  setSelectToggle(false);
                }}
              >
                16강
              </span>
            </div>
          )}
        </div>

        <div className="category-input">
          <input
            type="text"
            autoComplete="off"
            placeholder="카테고리를 4글자 이하로 입력해주세요."
            onChange={handleCategory}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"
            />
          </svg>
        </div>
        {/* 해당 버튼 클릭 시 전역 상태로 페이지 넘버 전환 되게 온클릭 함수 만들어야 함*/}
        <button className="next-step-button" type="submit">
          다음 단계로
        </button>
      </form>
    </div>
  );
}

export default Step2;
