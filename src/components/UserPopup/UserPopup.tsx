import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../server/firebase";
import { PopupUserData } from "../../types/Sign";
import { PopupContext, ToggleContextType } from "../../context/PopupContext";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "../../hooks/redux";
import { getReset } from "../../store/worldcup/createWorldcup";

interface PropsUserData {
  userData: PopupUserData;
}

const UserPopup = ({ userData }: PropsUserData) => {
  //redux dispatch 요청 메소드
  const dispatch = useAppDispatch();
  //네비게이터
  const navigate = useNavigate();

  const { setUserPopupToggle }: ToggleContextType = PopupContext();

  //로그아웃 메소드
  const logOut = () => {
    //로그아웃 메소드
    signOut(auth);
    //로컬스토리지 로그인 정보 삭제
    localStorage.removeItem("pickit-user");
    //전역 상태 초기화
    dispatch(getReset()); //redux초기화
    //메인으로 이동
    navigate("/");
  };

  const containerMotion = {
    initial: {
      opacity: 0,
      y: 10,
    },

    animate: {
      opacity: 1,
      y: 0,

      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.2,
      },
    },
  };

  const itemMotion = {
    initial: {
      opacity: 0,
    },

    animate: {
      opacity: 1,
    },

  };

  return (
    <motion.div
      className='userPopup-container'
      variants={containerMotion}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className='userPopup-wrap'>
        <div
          className='close-popup'
          onClick={() =>
            setUserPopupToggle ? setUserPopupToggle(false) : "none"
          }
        >
          <IoClose />
        </div>
        <motion.div className='user-profile' variants={itemMotion}>
          <div className='profile-img'>
            {userData.imgUrl === "default" ? (
              <FaUser />
            ) : (
              <img
                src={userData.imgUrl}
                alt={`${userData.nickName} 님의 프로필 이미지`}
              />
            )}
          </div>

          <div className='profile-info'>
            <div className='user-name'>
              <h1>{`${userData.nickName}님 환영합니다.`}</h1>
            </div>
            <button
              type='button'
              className='logOut-button'
              value='로그아웃'
              onClick={() => logOut()}
            >
              로그아웃
            </button>
          </div>
        </motion.div>

        <motion.ul className='user-menu' variants={itemMotion}>
          <li>
            <button className='menu' onClick={() => {
              setUserPopupToggle && setUserPopupToggle(false);
              navigate("/mypage");
            }}>
              마이페이지
            </button>
          </li>
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default UserPopup;
