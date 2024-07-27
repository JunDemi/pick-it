import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks/hooks";

function Step3() {
  //redux에 저장된 월드컵 생성 정보 셀렉터
  const createWorldcupData = useAppSelector(
    (state) => state.createWorldcupReducer
  );
  //파일 배열 저장
  const [imageList, setImageList] = useState<File[]>([]);
  //프리뷰 전용 파일리더 배열
  const [preview, setPreview] = useState<string[]>([]);
  //드래그 오버
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); //브라우저에 이미지 새 창이 뜨는 동작 제한
  }
  //드롭
  const handleDrop = (event: React.DragEvent) => {
    const middleList = [...imageList]; //함수 안에 임시적으로 저장되는 파일 리스트
    event.preventDefault(); //브라우저에 이미지 새 창이 뜨는 동작 제한
    const fileList = event.dataTransfer.files;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].size >= 2097152) {
        //파일 크기가 2MB 이상일 때 다음 루프로 스킵
        continue;
      } else {
        middleList.push(fileList[i]); //중간자 배열에 삽입. 반복문에 setState를 하면 렌더링이 반복되기 때문
      }
      if (middleList.length > createWorldcupData.tournamentRange) {
        alert("이미지 개수가 초과되었습니다.");
      } else {
        setImageList(middleList.slice(0, createWorldcupData.tournamentRange));
      }
    };
  }
  //일반 클릭 이벤트
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    //드래그 앤 드롭 형식이 아닌 일반적인 클릭 체인지 이벤트
    const middleList = [...imageList];
    const fileList = event.target.files;

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].size >= 2097152) {
          //파일 크기가 2MB 이상일 때 다음 루프로 스킵
          continue;
        } else {

          middleList.push(fileList[i]); //중간자 배열에 삽입. 반복문에 setState를 하면 렌더링이 반복되기 때문
        }
      }
      if (middleList.length > createWorldcupData.tournamentRange) {
        alert("이미지 개수가 초과되었습니다.");
      } else {
        setImageList(middleList.slice(0, createWorldcupData.tournamentRange));
      }
    }
  };
  console.log(imageList);

  return (
    <>
      <div className="create-game-step3">
        <div className="step3-left">
          <div>
            <h3 className='steps-page-number'>3 / 3</h3>
            <h1 className='steps-page-title'>이미지 업로드</h1>
            <p className='steps-page-desc'>
              월드컵 이미지들을 업로드 해주세요. <br />
              한장 당 최대 용량은 2MB로 제한됩니다.<br />
              업로드한 파일이 토너먼트 범위보다 많아지면 더 이상 등록되지 않습니다.<br />
              * 음란물 업로드 시 신고 혹은 제재대상이 될 수 있습니다. *
            </p>
          </div>
          <button>
            이미지 이름 수정하기
          </button>
        </div>

        <div className="step3-right">
          <label
            className="images-upload-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFile}
            />
            <div className="label-content">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M75 70C75 72.76 72.76 75 70 75H57.08L38.66 56.3375L60 34.9975L75 49.9975V70ZM10 75C7.24 75 5 72.76 5 70V67.6525L24.8625 49.8625L50.0025 75H10ZM20 10C25.5225 10 30 14.4775 30 20C30 25.5225 25.5225 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 10 20 10ZM70 0H10C4.4775 0 0 4.4775 0 10V70C0 75.5225 4.4775 80 10 80H70C75.5225 80 80 75.5225 80 70V10C80 4.4775 75.5225 0 70 0ZM20 25C22.76 25 25 22.76 25 20C25 17.24 22.76 15 20 15C17.24 15 15 17.24 15 20C15 22.76 17.24 25 20 25Z" fill="black" />
              </svg>
              여기에 이미지를 업로드하세요.
            </div>
          </label>

          <div className="imagelist-paging">
            <span>{imageList.length + " / " + createWorldcupData.tournamentRange}</span>
            <div>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="imagelist-preview">
            {preview.length > 0 && preview.slice(0, 4).map((file, number) => (
              <img
                key={number}
                src={file}
                alt="이미지"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Step3;
