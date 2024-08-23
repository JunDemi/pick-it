import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase";

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
