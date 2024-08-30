import { DocumentData } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { WorldcupImage } from "../../../types/Worldcup";
import { IoClose } from "react-icons/io5";

function EditGameInfo(prop: {
  gameData: {
    gameId: string;
    gameInfo: DocumentData;
  };
}) {
    const [thumbnailPopup, setThumbnailPopup] = useState<"left" | "right" | null>(null);
  return (
    <>
    <div className="edit-section">
      <h1>썸네일</h1>
      <div className="img-wrapper">
        <img src={prop.gameData.gameInfo.worldcupImages[3].filePath} alt="" />
        <img src={prop.gameData.gameInfo.worldcupImages[6].filePath} alt="" />
        <div className="click-img-wrapper">
          <div onClick={() => setThumbnailPopup("left")}>
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M75 70C75 72.76 72.76 75 70 75H57.08L38.66 56.3375L60 34.9975L75 49.9975V70ZM10 75C7.24 75 5 72.76 5 70V67.6525L24.8625 49.8625L50.0025 75H10ZM20 10C25.5225 10 30 14.4775 30 20C30 25.5225 25.5225 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 10 20 10ZM70 0H10C4.4775 0 0 4.4775 0 10V70C0 75.5225 4.4775 80 10 80H70C75.5225 80 80 75.5225 80 70V10C80 4.4775 75.5225 0 70 0ZM20 25C22.76 25 25 22.76 25 20C25 17.24 22.76 15 20 15C17.24 15 15 17.24 15 20C15 22.76 17.24 25 20 25Z"
              />
            </svg>
            변경하기
          </div>
          <div onClick={() => setThumbnailPopup("right")}>
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M75 70C75 72.76 72.76 75 70 75H57.08L38.66 56.3375L60 34.9975L75 49.9975V70ZM10 75C7.24 75 5 72.76 5 70V67.6525L24.8625 49.8625L50.0025 75H10ZM20 10C25.5225 10 30 14.4775 30 20C30 25.5225 25.5225 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 10 20 10ZM70 0H10C4.4775 0 0 4.4775 0 10V70C0 75.5225 4.4775 80 10 80H70C75.5225 80 80 75.5225 80 70V10C80 4.4775 75.5225 0 70 0ZM20 25C22.76 25 25 22.76 25 20C25 17.24 22.76 15 20 15C17.24 15 15 17.24 15 20C15 22.76 17.24 25 20 25Z"
              />
            </svg>
            변경하기
          </div>
        </div>
      </div>
      <h1>월드컵 제목</h1>
      <input type="text" />
      <h1>월드컵 설명</h1>
      <textarea />
      <h1>카테고리</h1>
      <div className="category-input">
        <input type="text" />
        <div>
          <span>
            asd
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
          <span>
            asd
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
          <span>
            asd
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      </div>
      <button className="save-button">변경사항 저장하기</button>
    </div>
    <AnimatePresence>
      {thumbnailPopup && (
          <motion.div
            className={(prop.gameData.gameInfo.worldcupImages.length > 8 && "scroll-hide") + " edit-thumbnail-popup"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="thumbnail-container">
            <IoClose onClick={() => setThumbnailPopup(null)}/>
                <h1>사진을 선택해주세요</h1>
                <div className="img-wrapper">
                {prop.gameData.gameInfo.worldcupImages.map((img: WorldcupImage, index: number) => (
                    <img src={img.filePath} alt="" key={img.fileIndex}/>
                ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default EditGameInfo;
