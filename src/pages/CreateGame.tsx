import { useState } from "react";
import "../assets/CreateGame/style.scss";

function CreateGame() {

  const [imageList, setImageList] = useState<File[]>([]);

  //드래그 오버
  const handleDragOver = (event: any) => {
    event.preventDefault(); //브라우저에 이미지 새 창이 뜨는 동작 제한
    console.log("Drag Over");
  };
  //드롭
  const handleDrop = (event: any) => {
    const middleList = [...imageList]; //함수 안에 임시적으로 저장되는 파일 리스트
    event.preventDefault(); //브라우저에 이미지 새 창이 뜨는 동작 제한
    const fileList = event.dataTransfer.files;
    for(let i = 0; i < fileList.length; i++){ 
      if(fileList[i].size >= 3145728){ //파일 크기가 3MB 이상일 때 동작 제한
        continue; //다음 루프로 스킵
      }else{
        middleList.push(fileList[i]);
      }
    }
    setImageList(middleList);
  };

  console.log(imageList);
  const handleFile = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
  }
  return (
    <>
      <label
        onDragEnter={() => console.log("Drag Enter")}
        onDragOver={handleDragOver}
        onDragLeave={() => console.log("Drag Leave")}
        onDrop={handleDrop}
        onChange={handleFile}
      >
        <input type="file" className="myfile" accept="image/*" multiple/>
        <h3>드래그</h3>
      </label>
    </>
  );
}

export default CreateGame;
