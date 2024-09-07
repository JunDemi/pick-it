import { DocumentData } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { WorldcupImage } from "../../../types/Worldcup";

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

function PCWorldcup(prop: {
  popData: {
    worldcupId: string;
    worldcupInfo: DocumentData;
  }[];
}) {
  //현재 슬라이드 페이지
  const [currentPage, setCurrentPage] = useState<number>(0);
  //슬라이드가 뒤로 가는지 앞으로 가는지
  const [isback, setIsBack] = useState<boolean>(false);
  //슬라이드 동안 버튼을 클릭할 수 없게
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  //슬라이드 버튼 클릭 이벤트
  const clickSlide = (direction: "prev" | "next") => {
    //0.65초 후 버튼 활성화
    setTimeout(() => {
      setBtnDisable(false);
    }, 650);
    //이전 버튼 클릭
    if (direction === "prev") {
      //뒤로 가는 것을 framer에게 전달
      setIsBack(true);
      //맨 첫 페이지일 경우 마지막 페이지로 이동
      setCurrentPage((prev) =>
        prev === 0 ? Math.ceil(prop.popData.length / 5) - 1 : prev - 1
      );
      //다음 버튼 클릭
    } else {
      //앞으로 가는 것을 framer에게 전달
      setIsBack(false);
      //맨 뒤 페이지일 경우 첫 페이지로 이동
      setCurrentPage((prev) =>
        prev === Math.ceil(prop.popData.length / 5) - 1 ? 0 : prev + 1
      );
    }
  };
  return (
    <>
      <div className="pop-worldcup-slide-container">
        <AnimatePresence mode="sync" custom={isback}>
          {[...Array(Math.ceil(prop.popData.length / 5))].map(
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
                  {prop.popData
                    .slice(currentPage * 5, currentPage * 5 + 5)
                    .map((data, d) => (
                      <div key={d} className="item">
                        <div className="img-wrapper">
                          <img
                            src={
                              data.worldcupInfo.worldcupImages.sort(
                                (a: WorldcupImage, b: WorldcupImage) =>
                                  a.fileIndex - b.fileIndex
                              )[data.worldcupInfo.thumbnail[0]].filePath
                            }
                            alt=""
                          />
                          <img
                            src={
                              data.worldcupInfo.worldcupImages.sort(
                                (a: WorldcupImage, b: WorldcupImage) =>
                                  a.fileIndex - b.fileIndex
                              )[data.worldcupInfo.thumbnail[1]].filePath
                            }
                            alt=""
                          />
                        </div>
                        <div className="item-title">
                          {data.worldcupInfo.worldcupTitle}
                        </div>
                      </div>
                    ))}
                </motion.div>
              )
          )}
        </AnimatePresence>

        <button
          className="prev"
          onClick={() => {
            //버튼 로딩
            setBtnDisable(true);
            clickSlide("prev");
          }}
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
          onClick={() => {
            //버튼 로딩
            setBtnDisable(true);
            clickSlide("next");
          }}
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
