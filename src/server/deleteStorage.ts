import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase";
import { WorldcupImage } from "../types/Worldcup";

//프로필 이미지 스토리지에서 제거 (이미지 변경, 계정 삭제 등)
export const deleteProfileImg = async (imgPath: string) => {
  //기본 이미지면 함수 실행 x
  if (imgPath === "default") {
    return;
  } else {
    //스토리지 제거 함수: deleteObject
    const profileImgRef = ref(storage, imgPath);
    deleteObject(profileImgRef);
  }
};

//월드컵 삭제: 해당 월드컵의 이미지 모두 삭제
export const deleteWorldcupImg = async (imageArray: WorldcupImage[]) => {
  //스토리지 제거 함수: deleteObject
  imageArray.forEach((worldcupImage) => {
    const wolrdcupImgRef = ref(storage, worldcupImage.filePath);
    deleteObject(wolrdcupImgRef);
  });
};
