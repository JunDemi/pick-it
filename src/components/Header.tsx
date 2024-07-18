import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../server/firebase";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Header() {
  //네비게이터
  const navigate = useNavigate();
  //로그인 상태 확인
  const user: string | null = localStorage.getItem("pickit-user");
  //로그아웃 메소드
  const logOut = () => {
    //로그아웃 메소드
    signOut(auth);
    //로컬스토리지 로그인 정보 삭제
    localStorage.setItem(
      "pickit-user",
      "" //비어있는 값
    );
    navigate("/");
  };
  const location = useLocation();

  //햄버거 메뉴 토글
  const [userPopupToggle, setUserPopupToggle] = useState<boolean>(false);

  return (
    <>
      <header className="header-container">
        <div className="header-logo">
          <Link to="/" className="logo">
            PICKIT
          </Link>
        </div>
        <nav>
          <ul className="main-menu">
            <li className={location.pathname === "/" ? "menu active" : "menu"}>
              <a href="/">대시보드</a>
            </li>

            <li
              className={
                location.pathname === "/worldCup" ? "menu active" : "menu"
              }
            >
              <a href="/">월드컵 참여</a>
            </li>

            <li
              className={
                location.pathname === "/create-game" ? "menu active" : "menu"
              }
            >
              <a href="/create-game">월드컵 생성</a>
            </li>
          </ul>

          <div className="user-menu">
            {user ? (
              <button className="login-menu" onClick={logOut}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.51172 4.13672L13.3086 8.93359C13.5898 9.21484 13.75 9.60156 13.75 10C13.75 10.3984 13.5898 10.7852 13.3086 11.0664L8.51172 15.8633C8.26172 16.1133 7.92578 16.25 7.57422 16.25C6.84375 16.25 6.25 15.6562 6.25 14.9258V12.5H1.25C0.558594 12.5 0 11.9414 0 11.25V8.75C0 8.05859 0.558594 7.5 1.25 7.5H6.25V5.07422C6.25 4.34375 6.84375 3.75 7.57422 3.75C7.92578 3.75 8.26172 3.89062 8.51172 4.13672ZM13.75 16.25H16.25C16.9414 16.25 17.5 15.6914 17.5 15V5C17.5 4.30859 16.9414 3.75 16.25 3.75H13.75C13.0586 3.75 12.5 3.19141 12.5 2.5C12.5 1.80859 13.0586 1.25 13.75 1.25H16.25C18.3203 1.25 20 2.92969 20 5V15C20 17.0703 18.3203 18.75 16.25 18.75H13.75C13.0586 18.75 12.5 18.1914 12.5 17.5C12.5 16.8086 13.0586 16.25 13.75 16.25Z"
                    fill="black"
                  />
                </svg>
                <p>LOG OUT</p>
              </button>
            ) : (
              <Link to="/login" className="login-menu">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.51172 4.13672L13.3086 8.93359C13.5898 9.21484 13.75 9.60156 13.75 10C13.75 10.3984 13.5898 10.7852 13.3086 11.0664L8.51172 15.8633C8.26172 16.1133 7.92578 16.25 7.57422 16.25C6.84375 16.25 6.25 15.6562 6.25 14.9258V12.5H1.25C0.558594 12.5 0 11.9414 0 11.25V8.75C0 8.05859 0.558594 7.5 1.25 7.5H6.25V5.07422C6.25 4.34375 6.84375 3.75 7.57422 3.75C7.92578 3.75 8.26172 3.89062 8.51172 4.13672ZM13.75 16.25H16.25C16.9414 16.25 17.5 15.6914 17.5 15V5C17.5 4.30859 16.9414 3.75 16.25 3.75H13.75C13.0586 3.75 12.5 3.19141 12.5 2.5C12.5 1.80859 13.0586 1.25 13.75 1.25H16.25C18.3203 1.25 20 2.92969 20 5V15C20 17.0703 18.3203 18.75 16.25 18.75H13.75C13.0586 18.75 12.5 18.1914 12.5 17.5C12.5 16.8086 13.0586 16.25 13.75 16.25Z"
                    fill="black"
                  />
                </svg>
                <p>LOGIN</p>
              </Link>
            )}

            <div className="user-profile">
              {user ? (
                <>
                  <div className="user-imgBox"></div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="non-member"
                    onClick={() => setUserPopupToggle(!userPopupToggle)}
                  >
                    <FaUser />
                    <p>프로필</p>
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div style={{ height: "5rem" }} />
    </>
  );
}

export default Header;
