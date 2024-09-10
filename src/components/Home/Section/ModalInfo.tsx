import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageRankList } from "../../../server/firebaseWorldcup";
import { ImageRankData } from "../../../types/Worldcup";

function ModalInfo(prop: {
  data: {
    worldcupId: string;
    worldcupInfo: DocumentData;
  };
}) {
  const modalInfo = prop.data.worldcupInfo;
  //이미지 랭킹 저장 상태
  const [imageRank, setImageRank] = useState<ImageRankData[] | null>([]);
  //이미지 랭킹 불러오기
  useEffect(() => {
    getImageRankList(prop.data.worldcupId).then((result) => setImageRank(result))
  }, []);

  console.log(imageRank);
  return (
    <>
      <div className="modal-img-wrapper">
        <img
          src={modalInfo.worldcupImages[modalInfo.thumbnail[0]].filePath}
          alt=""
        />
        <img
          src={modalInfo.worldcupImages[modalInfo.thumbnail[1]].filePath}
          alt=""
        />
        <div className="cover-dark">
          <h2>{modalInfo.worldcupTitle}</h2>
          <p>{modalInfo.worldcupDescription}</p>
          <div className="end-wrapper">
              <Link to={`/play-game/${prop.data.worldcupId}`}>
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
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
                시작하기
              </Link>
            <div className="categories">
                {modalInfo.category.map((text: string, i: number) => (
                    <span key={i}>#{text}</span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <h1>Hello</h1>
    </>
  );
}
export default ModalInfo;
