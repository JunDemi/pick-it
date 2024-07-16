import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuid } from "uuid";
//파일 스토리지 업로드 함수
export const uploadProfile = async (
  userId: string,
  profileImg: File | "default"
) => {
  if (profileImg !== "default") {
    const imageRef = ref(
      //이미지 파일이름: 유저ID + 랜덤조합텍스트 + 파일이름
      storage,
      `profile-img/${userId + uuid() + profileImg.name}`
    );
    const imgSnap = await uploadBytes(imageRef, profileImg); //파이어 스토리지에 이미지 업로드
    const imgpath = await getDownloadURL(imgSnap.ref); //생성된 이미지 파일 링크를 변수에 저장

    return imgpath;
    
  } else {
    //프로필 이미지가 없을 경우(default)
    return profileImg;
  }
};
