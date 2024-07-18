import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import "../src/assets/global.scss";
import CreateGame from "./pages/CreateGame";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./AuthContext";

function App() {
  //로그인 여부 확인
  const { user }: any = AuthContext();
  if (user.isLogin) {
    localStorage.setItem( //로컬 스토리지 등록
      "pickit-user",
      JSON.stringify({
        LoginToken: user.user.uid,
        UserId: String(user.user.email).slice(
          0,
          String(user.user.email).indexOf("@") //이메일 도메인 제거
        ),
      })
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
