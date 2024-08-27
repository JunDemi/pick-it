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

  const [inputData, setInputData] = useState<WorldcupImage[]>();
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
        input.fileIndex === index
          ? { ...input, fileName: event.target.value }
          : input
      );
      setInputData(newInputs);
    }
  };

  console.log(inputData);
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
                .sort((indexA, indexB) => indexA.fileIndex - indexB.fileIndex)
                .map((items) => (
                  <tr key={items.fileIndex}>
                    <td>{items.fileIndex + 1}</td>
                    <td>
                      <img src={items.filePath} alt="" />
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
