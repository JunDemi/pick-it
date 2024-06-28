import { useState } from "react";
import "../assets/CreateGame/style.scss";

function CreateGame() {
  const [imageList, setImageList] = useState<File[]>([]);

  //드롭
  const handleDrop = (event: React.DragEvent) => {
    const middleList = []; //함수 안에 임시적으로 저장되는 파일 리스트
    event.preventDefault(); //브라우저에 이미지 새 창이 뜨는 동작 제한
    const fileList = event.dataTransfer.files;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].size >= 3145728) {
        //파일 크기가 3MB 이상일 때 다음 루프로 스킵
        continue;
      } else {
        middleList.push(fileList[i]); //중간자 배열에 삽입. 반복문에 setState를 하면 렌더링이 반복되기 때문r
      }
    }
    setImageList(middleList);
  };
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    //드래그 앤 드롭 형식이 아닌 일반적인 클릭 체인지 이벤트
    const middleList = [];
    const fileList = event.target.files;

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].size >= 3145728) {
          continue;
        } else {
          middleList.push(fileList[i]);
        }
      }
     setImageList(middleList);
    }
  };

  console.log(imageList);
  return (
    <>
      <label
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="myfile"
          accept="image/*"
          multiple
          onChange={handleFile}
        />
        <h3>드래그</h3>
      </label>
    </>
  );
}

export default CreateGame;
