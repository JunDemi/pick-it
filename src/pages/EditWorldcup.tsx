import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findSelectWorldcup } from "../server/firebaseWorldcup";
import { DocumentData } from "firebase/firestore";
import "../assets/MyPage/editWorldcup.scss";
import { WorldcupImage } from "../types/Worldcup";

function EditWorldcup() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();
  //네비게이션
  const navigate = useNavigate();
  //로컬스토리지에 존재하는 유저 데이터
  const user = localStorage.getItem("pickit-user");
  const parseUser = user ? JSON.parse(user) : null;
  // 해당 ID의 월드컵 전체정보를 불러오는 상태
  const [gameData, setGameData] = useState<{
    gameId: string;
    gameInfo: DocumentData;
  } | null>(null);

  const [inputData, setInputData] = useState<
    {
      fileIndex: number;
      filePath: string;
      fileName: string;
      previewImg: File | null;
    }[]
  >();
  // 데이터 불러오기 로딩 동작
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //유저 체크
  useEffect(() => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    }
  }, [navigate, user]);
  //데이터 불러오기
  useEffect(() => {
    if (gameId) {
      findSelectWorldcup(gameId)
        .then((result) => {
          setGameData(result); //전체 데이터 저장
          setInputData(result?.gameInfo.worldcupImages); //이미지 목록 데이터만 저장
        })
        .then(() => setIsLoading(false));
    }
  }, [gameId]);

  //이미지 목록 이름 텍스트 변경 온체인지 핸들러
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (inputData) {
      const newInputs = inputData.map((input) =>
        //체인지를 준 텍스트의 인덱스와 배열 인덱스가 동일한 데이터의 fileName업데이트
        input.fileIndex === index
          ? { ...input, fileName: event.target.value }
          : input
      );
      setInputData(newInputs);
    }
  };

  const setOnChangeFile = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (inputData) {
      const newInputs = inputData.map((input) => {
        //체인지를 준 파일의 인덱스와 배열 인덱스가 동일한 데이터의 프리뷰이미지 업데이트, 취소하면 null
        return input.fileIndex === index
          ? {
              ...input,
              previewImg: event.target.files ? event.target.files[0] : null,
            }
          : input;
      });
      setInputData(newInputs);
    }
  };
  return !isLoading && gameData && inputData ? (
    gameData.gameInfo.userId === parseUser.UserId ? (
      <div className="edit-worldcup-container">
        <section className="update-section">
          <table>
            <thead>
              <tr>
                <td>순번</td>
                <td>이미지</td>
                <td>이름</td>
                <td>필드 삭제</td>
              </tr>
            </thead>
            <tbody>
              {inputData
                //.sort((indexA, indexB) => indexA.fileIndex - indexB.fileIndex)
                .map((items, number) => (
                  <tr key={items.fileIndex}>
                    <td>{number + 1}</td>
                    <td>
                      <label>
                        <div className="img-wrapper">
                          <div className="icon-wrapper">
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
                            이미지 변경하기
                          </div>

                          <img
                            src={
                              items.previewImg
                                ? (URL.createObjectURL(
                                    items.previewImg
                                  ) as string)
                                : items.filePath
                            }
                            alt=""
                          />
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            setOnChangeFile(items.fileIndex, event)
                          }
                        />
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={items.fileName}
                        onChange={(event) =>
                          handleInputChange(items.fileIndex, event)
                        }
                      />
                    </td>
                    <td>
                      <button>삭제</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <aside></aside>
      </div>
    ) : (
      <div className="before-game-message">
        <h2>잘못된 접근입니다.</h2>
      </div>
    )
  ) : (
    <div className="before-game-message">
      <h2>데이터를 불러오는 중입니다...</h2>
      <div className="loading-spiner">
        <hr />
        <div />
      </div>
    </div>
  );
}
export default EditWorldcup;
