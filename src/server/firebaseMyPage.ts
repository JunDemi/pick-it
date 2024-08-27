import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { deleteProfileImg, deleteWorldcupImg } from "./deleteStorage";
import { getAuth, updatePassword } from "firebase/auth";
import { userReAuthtication } from "./firebaseAuth";
import { WorldcupImage } from "../types/Worldcup";
//auth 세션불러오기
const auth = getAuth();
//파이어베이스 DB연동
const authRef = collection(db, "users");
//유저 ID를 통해 해당 문서를 불러오는 쿼리
const getFindUserDocs = async (userId: string) => {
  //users테이블의 유저ID 조회
  const findRef = query(authRef, where("userId", "==", userId));
  //docs값 할당
  const findIdDocs = await getDocs(findRef).then((docRes) => {
    return docRes.docs;
  });
  //promise반환이 완료된 후 최종 반환
  return Promise.all(findIdDocs);
};

//내 월드컵, 참여 월드컵, (댓글) 불러오기
export const getMyPlayAmount = async (userId: string) => {
  //내 월드컵 불러오는 쿼리
  const findWorldcupQuery = query(
    collection(db, "worldcup"),
    where("userId", "==", userId)
  );
  // 내 ID가 포함된 이미지 랭킹 불러오기
  const findplayedQuery = query(
    collection(db, "imageRank"),
    where("userId", "array-contains", userId) // 배열 컬럼의 where문은 array-contains로 검색할 수 있음
  );

  //내 월드컵 할당
  const myWorldcupAmount = await getDocs(findWorldcupQuery).then((result) => {
    return result.docs.map((data) => {
      return {
        gameId: data.id,
        gameInfo: data.data(),
      };
    });
  });
  // 참여 월드컵 할당
  const playedAmount = await getDocs(findplayedQuery).then((result) => {
    return (
      result.docs
        .map((data) => {
          //map함수를 사용하여 월드컵 ID값만 배열에 저장
          return String(data.data().gameId);
        })
        //filter를 사용하여 배열 내 중복된 월드컵 ID값을 제거
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  });
  return {
    myWorldcup: myWorldcupAmount,
    playedWorldcup: playedAmount,
  };
};

// 내가 참여한 월드컵 ID를 통해 월드컵의 전체 정보 가져오기
export const getPlayedWorldcup = (worldcupId: string[]) => {
  //참여한 월드컵 ID배열 map
  const worldcupArray = worldcupId.map(async (id) => {
    const findWorldcupQuery = query(
      collection(db, "worldcup"),
      where(documentId(), "==", id)
    );
    const worldcupDocs = await getDocs(findWorldcupQuery);

    if (worldcupDocs.empty) {
      return null;
    } else {
      const resultArray = worldcupDocs.docs.map((res2) => {
        return {
          gameId: res2.id,
          gameInfo: res2.data(),
        };
      });
      //데이터는 하나지면 배열 형태로 불러오기 때문애 [0]만 반환
      return resultArray[0];
    }
  });
  //Promise.all()을 사용하여 map배열 내에 있는 모든 promise반환이 완료된 값을 최종 리턴
  return Promise.all(worldcupArray);
};
/* 전송할 데이터가 월드컵 전체 데이터를 부를 필요는 없음. 메모리 누수 해결을 위해 딱 필요한 값만 리턴 할 것 */

//유저별 월드컵 참여 기록 가져오기
export const getUserWorldcupHistory = async (userId: string) => {
  //유저 데이터 docs가져오기
  const findIdDocs = await getFindUserDocs(userId);
  //월드컴 참여 기록 배열 컬럼만 추출
  const myWorldcupHisory = findIdDocs.map((doc) => {
    return doc.data()["worldcupHistory"];
  });

  return myWorldcupHisory[0];
};

//프로필 이미지 변경
export const setMyProfileImage = async (userId: string, imgPath: string) => {
  //유저 데이터 docs가져오기
  const findIdDocs = await getFindUserDocs(userId);
  //해당 유저 데이터의 문서 전체 불러오기
  const findUser = findIdDocs.find((data) => data.data()["userId"] === userId);
  if (findUser) {
    //기존 프로필 이미지 스토리지에 제거
    await deleteProfileImg(findUser.data()["userImg"]);
    //업데이트 쿼리
    const userRef = doc(db, "users", findUser.id); //문서 ID
    await updateDoc(userRef, {
      userImg: imgPath === "default" ? "default" : imgPath,
    });
  }
};
// 닉네임 변경
export const setMyNickName = async (userId: string, nickName: string) => {
  if (nickName === "already-exist") {
    return "fail";
  } else {
    //유저 데이터 docs가져오기
    const findIdDocs = await getFindUserDocs(userId);
    //해당 유저 데이터의 문서 전체 불러오기
    const findUser = findIdDocs.find(
      (data) => data.data()["userId"] === userId
    );
    if (findUser) {
      //업데이트 쿼리
      const userRef = doc(db, "users", findUser.id); //문서 ID
      await updateDoc(userRef, {
        userNickName: nickName,
      });
    }
    return "success";
  }
};

//비밀번호 확인 메소드
export const setMyPassword = async (argData: {
  currentPw: string;
  userId: string;
  changePw?: string;
}, editType: "비밀번호변경" | "회원탈퇴") => {
  //유저 데이터 docs가져오기
  const findIdDocs = await getFindUserDocs(argData.userId);
  //해당 유저 데이터의 비밀번호와 현재 비밀번호 입력이 일치하는지
  const findPassword = findIdDocs.find(
    (data) => data.data()["userPw"] === argData.currentPw
  );
  //비밀번호가 일치하면
  if (findPassword) {
    //현재 접속 중인 유저 로그인 정보
    const me = auth.currentUser;
    if (me) {
      //firebase 어센틱의 업데이트를 위해선 사용자 재인증 필요
      const reAutentic = await userReAuthtication(
        me,
        `${argData.userId}@pick.it`,
        argData.currentPw
      );
      //재인증이 성공되었다면
      if (reAutentic) {
        //비밀번호 변경
        if(editType === "비밀번호변경" && argData.changePw){
          const userRef = doc(db, "users", findPassword.id); //문서 ID
          //firebase updatePassword매소드
          await updatePassword(me, argData.changePw);
          //firestore 유저 테이블 업데이트
          await updateDoc(userRef, {
            userPw: argData.changePw,
          });
        }
        return true;
      }
      //재인증 실패
      else {
        return false;
      }
    }
    //접속 중인 유저 정보가 없다면
    else {
      return false;
    }
  }
  //비밀번호가 일치하지 않으면
  else {
    alert("현재 비밀번호가 일치하지 않습니다.");
    return false;
  }
};

//월드컵 삭제
export const deleteWorldcup = async (userId: string) => {
  //내 월드컵 불러오는 쿼리
  const findWorldcupQuery = query(
    collection(db, "worldcup"),
    where("userId", "==", userId)
  );
  //유저가 작성한 월드컵들의 ID, 이미지배열 추출
  const findWorldcupId = await getDocs(findWorldcupQuery).then((res) => {
    return res.docs.map((res2) => {
      return {
        docId: res2.id,
        worldcupImages: res2.data()["worldcupImages"],
      };
    });
  });

  //추출된 데이터를 가진 월드컵 삭제
  findWorldcupId.forEach(
    async (worldcupData: {
      docId: string;
      worldcupImages: WorldcupImage[];
    }) => {
      await deleteWorldcupImg(worldcupData.worldcupImages); //해당 월드컵 데이터에 있는 스토리지 이미지들 삭제
      await deleteImageRank(worldcupData.docId); //월드컵의 이미지 랭킹 데이터 삭제
      await deleteDoc(doc(db, "worldcup", worldcupData.docId)); //월드컵 삭제
    }
  );
};

//월드컵의 모든 이미지 랭킹 데이터 삭제
const deleteImageRank = async (gamdId: string) => {
  //해당 월드컵의 이미지 랭킹 조회 쿼리
  const findImgRankQuery = query(
    collection(db, "imageRank"),
    where("gamdId", "==", gamdId)
  );
  //이미지 랭킹 배열을 루프시켜 데이터 삭제
  await getDocs(findImgRankQuery).then((res) => {
    res.docs.forEach((data) => {
      deleteDoc(doc(db, "imageRank", data.id));
    });
  });
};
