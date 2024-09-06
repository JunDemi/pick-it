import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

//Framer Motion 슬라이더 Variant
const boxVar = {
  entry: (isback: boolean) => ({
    x: isback ? -800 : 800,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.6,
    },
  },
  hide: (isback: boolean) => ({
    x: isback ? 800 : -800,
    opacity: 0,
    transition: {
      type: "spring",
      duration: 0.6,
    },
  }),
};

function PCWorldcup() {
  //현재 슬라이드 페이지
  const [currentPage, setCurrentPage] = useState<number>(0);
  //슬라이드가 뒤로 가는지 앞으로 가는지
  const [isback, setIsBack] = useState<boolean>(false);
  //슬라이드 동안 버튼을 클릭할 수 없게
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  //슬라이드 버튼 클릭 이벤트
  const clickSlide = (direction: "prev" | "next") => {
    //버튼 로딩
    setBtnDisable(true);
    //0.5초 후 버튼 활성화
    setTimeout(() => {
      setBtnDisable(false);
    }, 500);
    //이전 버튼 클릭
    if (direction === "prev") {
      //뒤로 가는 것을 framer에게 전달
      setIsBack(true);
      //맨 첫 페이지일 경우 마지막 페이지로 이동
      setCurrentPage((prev) =>
        prev === 0 ? testData.length / 5 - 1 : prev - 1
      );
      //다음 버튼 클릭
    } else {
      //앞으로 가는 것을 framer에게 전달
      setIsBack(false);
      //맨 뒤 페이지일 경우 첫 페이지로 이동
      setCurrentPage((prev) =>
        prev === testData.length / 5 - 1 ? 0 : prev + 1
      );
    }
  };
  return (
    <>
      <div className="pop-worldcup-slide-container">
        <AnimatePresence mode="sync" custom={isback}>
          {[...Array(testData.length / 5)].map(
            (_, i) =>
              i === currentPage && (
                <motion.div
                  key={i}
                  className="slide-wrapper"
                  variants={boxVar}
                  initial="entry"
                  animate="center"
                  exit="hide"
                  custom={isback}
                >
                  {testData
                    .slice(currentPage * 5, currentPage * 5 + 5)
                    .map((data, d) => (
                      <div key={d} className="item">
                        {data.name}
                      </div>
                    ))}
                </motion.div>
              )
          )}
        </AnimatePresence>

        <button
          className="prev"
          onClick={() => clickSlide("prev")}
          disabled={btnDisable}
        >
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="next"
          onClick={() => clickSlide("next")}
          disabled={btnDisable}
        >
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default PCWorldcup;

const testData = [
  {
    id: 1,
    name: "item1",
  },
  {
    id: 2,
    name: "item2",
  },
  {
    id: 3,
    name: "item3",
  },
  {
    id: 4,
    name: "item4",
  },
  {
    id: 5,
    name: "item5",
  },
  {
    id: 6,
    name: "item6",
  },
  {
    id: 7,
    name: "item7",
  },
  {
    id: 8,
    name: "item8",
  },
  {
    id: 9,
    name: "item9",
  },
  {
    id: 10,
    name: "item10",
  },
  {
    id: 11,
    name: "item11",
  },
  {
    id: 12,
    name: "item12",
  },
  {
    id: 13,
    name: "item13",
  },
  {
    id: 14,
    name: "item14",
  },
  {
    id: 15,
    name: "item15",
  },
  {
    id: 16,
    name: "item16",
  },
  {
    id: 17,
    name: "item17",
  },
  {
    id: 18,
    name: "item18",
  },
  {
    id: 19,
    name: "item19",
  },
  {
    id: 20,
    name: "item20",
  },
];
