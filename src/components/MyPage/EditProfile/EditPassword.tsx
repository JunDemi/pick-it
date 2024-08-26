import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setMyPassword } from "../../../server/firebaseMyPage";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebase";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { getReset } from "../../../store/worldcup/createWorldcup";
import { AnimatePresence, motion } from "framer-motion";

function EditPassword(props: { userId: string; loginToken: string }) {
  //redux dispatch 요청 메소드
  const dispatch = useAppDispatch();
  //네비게이터
  const navigate = useNavigate();
  //핸들러 동작 시 로딩
  const [editLoading, setEditLoding] = useState<boolean>(false);
  //비밀번호 변경 완료 팝업
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false);
  //리액트 훅 폼
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    currentPw: string;
    changePw: string;
  }>({ mode: "onSubmit" });

  //핸들러 이벤트
  const passwordValid = async (input: {
    currentPw: string;
    changePw: string;
  }) => {
    setEditLoding(true);
    //비밀번호 변경 메소드
    await setMyPassword({
      currentPw: input.currentPw,
      changePw: input.changePw,
      userId: props.userId,
      loginToken: props.loginToken,
    }).then((result) =>
      result ? setLogoutPopup(result) : setEditLoding(false)
    );
  };

  //비밀번호 변경이 완료 되면 로그아웃
  const logOut = () => {
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
      <form
        className="edit-section edit-info"
        onSubmit={handleSubmit(passwordValid)}
      >
        <h1>비밀번호 변경하기</h1>
        <table>
          <tbody>
            <tr>
              <td>현재 비밀번호</td>
              <td>
                <input
                  type="password"
                  className="change-text"
                  {...register("currentPw", {
                    required: true,
                  })}
                />
              </td>
            </tr>
            <tr>
              <td>변경할 비밀번호</td>
              <td>
                <input
                  type="password"
                  className="change-text"
                  {...register("changePw", {
                    required: "변경할 비밀번호를 입력하세요.",
                    validate: {
                      min: (value: string) =>
                        value.length >= 6 || "비밀번호는 최소 6자입니다.",
                      max: (value: string) =>
                        value.length <= 16 || "비밀번호는 최대 16자입니다.",
                    },
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {errors.changePw && <p>{errors.changePw.message}</p>}
        <button type="submit" disabled={editLoading}>
          {" "}
          {editLoading ? "로딩중..." : "변경하기"}
        </button>
      </form>
      <AnimatePresence>
        {logoutPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={logoutPopup ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            className="password-change-success-popup"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={logoutPopup ? { scale: 1 } : { scale: 0 }}
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
                비밀번호가 변경되었습니다. 다시 로그인 해주세요.
              </h2>
              <button onClick={logOut}>확인</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EditPassword;