import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks/hooks";
import { CreateGame } from "../../types/Worldcup";

function Step3Modify(props: { imageList: File[] }) {
    //로컬스토리지 사용자 정보 불러오기
    const user = localStorage.getItem("pickit-user");
  //redux에 저장된 월드컵 생성 정보 셀렉터
  const createWorldcupData = useAppSelector(
    (state) => state.createWorldcupReducer
  );
  //파일 프리뷰 반환 함수
  const fileURL = (file: File) => {
    return URL.createObjectURL(file) as string;
  };
  //폼 동작을 위한 전용 데이터 객체 및 state 생성
  const initialData = props.imageList.map((data, number) => {
    return {
      index: number,
      imgSrc: fileURL(data),
      name: data.name.slice(0, data.name.indexOf(".")),
      file: data
    };
  });
  const [inputData, setInputData] = useState(initialData);
  //이미지 이름을 바꿀 때 발생하는 온체인지 핸들러
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = inputData.map((input) =>
      input.index === index ? { ...input, name: event.target.value } : input
    );
    setInputData(newInputs);
  };
  //이미지 수정 테이블 페이지 번호
  const [modifyPage, setModifyPage] = useState<number>(0);
  //최종 게임 생성 버튼 핸들러
  const createGame = () => {
    if(user){
        //백엔드에 전송할 데이터 집합
        const sendData:CreateGame = {
            userId: JSON.parse(user).UserId as string, //사용자 ID
            worldCupTitle: createWorldcupData.worldCupTitle, //월드컵 제목
            worldcupDescription: createWorldcupData.worldcupDescription, //월드컵 설명
            tournamentRange: createWorldcupData.tournamentRange, //토너먼트 범위
            category: createWorldcupData.category, //카테고리 배열
            images: inputData //이미지 목록(순번, 파일, 이름, 소스)
        }
        console.log(sendData);
    }
  };
  return (
    <>
      <div className="modify-head">
        <h3>이미지 이름 수정</h3>
        <button onClick={createGame}>수정 완료 및 월드컵 생성</button>
      </div>
      <table className="modify-section">
        <thead>
          <tr>
            <td>순번</td>
            <td>이미지</td>
            <td>이미지 이름</td>
          </tr>
        </thead>
        <tbody>
          {inputData
            .slice(modifyPage * 4, modifyPage * 4 + 4)
            .map((data, number) => (
              <tr key={number}>
                <td>{data.index + 1}</td>
                <td>
                  <img src={data.imgSrc} alt="" />
                </td>
                <td>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(event) => handleInputChange(data.index, event)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="modify-paging">
        {[...Array(inputData.length / 4)].map((_, index) => (
          <button
            key={index}
            onClick={() => setModifyPage(index)}
            className={modifyPage === index ? "get-page" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Step3Modify;
