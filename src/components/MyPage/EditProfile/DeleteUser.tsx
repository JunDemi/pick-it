import React, { useRef, useState } from "react";
import { deleteWorldcup, setMyPassword } from "../../../server/firebaseMyPage";
import { deleteMyProfile } from "../../../server/firebaseAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebase";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { getReset } from "../../../store/worldcup/createWorldcup";
import { AnimatePresence, motion } from "framer-motion";

function DeleteUser(props: { userId: string }) {
  //redux dispatch 요청 메소드
  const dispatch = useAppDispatch();
  //네비게이터
  const navigate = useNavigate();
  //값이 비어있을 경우 자동 focus를 위한 ref
  const textRef = useRef<HTMLInputElement>(null);
  //텍스트 온체인지에 할당할 상태
  const [thisPassword, setThisPassword] = useState<string>();
  //변경할 닉네임 텍스트 온체인지 이벤트 상태 할당
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThisPassword(event.target.value);
  };
  //핸들러 동작 시 로딩
  const [exitLoading, setExitLoding] = useState<boolean>(false);
  //회원탈퇴 완료 팝업
  const [exitPopup, setExitPopup] = useState<boolean>(false);
  //회원 탈퇴 핸들러
  const deleteHandler = async () => {
    setExitLoding(true);
    if (!thisPassword) {
      //thisPassword값이 비어있을 경우 자동 포커스
      textRef.current && textRef.current.focus();
      setExitLoding(false);
    } else if (thisPassword) {
      //1. 비밀번호 확인
      await setMyPassword(
        {
          currentPw: thisPassword,
          userId: props.userId,
        },
        "회원탈퇴"
      ).then((result) => {
        //비밀번호 확인 완료
        if (result) {
          deleteWorldcup(props.userId) //2.유저가 제작한 모든 월드컵 정보 삭제
            .then(() => deleteMyProfile(props.userId)) //3. 유저 정보 삭제
            .then(() => setExitPopup(true)); //4. 회원탈퇴 완료 팝업 등장
        } else {
            setExitLoding(false);
        }
      });
    }
  };
  //5. 삭제 절차가 끝나면 로그아웃
  const goodBye = () => {
    //로그아웃 메소드
    signOut(auth);
    //로컬스토리지 로그인, 게임 데이터 정보 삭제
    localStorage.removeItem("pickit-user");
    localStorage.removeItem("game-data");
    //전역 상태 초기화
    dispatch(getReset()); //redux초기화
    //메인으로 이동
    navigate("/login");
  };
  return (
    <>
    <div className="edit-section delete-user">
      <h1>회원탈퇴</h1>
      <p>
        탈퇴하시면 작성하신 월드컵, 게시물, 댓글이 전부 삭제됩니다.
        <br />
        <br />
        정말 PICKIT 회원을 탈퇴하시겠습니까?
      </p>
      <div className="confirm-password">
        비밀번호 확인
        <input type="password" ref={textRef} onChange={passwordChange} />
      </div>
      <button onClick={deleteHandler} disabled={exitLoading}>{exitLoading ? "로딩중..." : "네. 탈퇴하겠습니다."}</button>
    </div>
    <AnimatePresence>
        {exitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={exitPopup ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            className="password-change-success-popup"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={exitPopup ? { scale: 1 } : { scale: 0 }}
              exit={{ scale: 0 }}
            >
              <h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                회원탈퇴가 완료되었습니다.
              </h2>
              <button onClick={goodBye}>확인</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DeleteUser;
