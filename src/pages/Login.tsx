import React from "react";
import "../assets/Sign/sign.scss";
import { useForm } from "react-hook-form";
import InputField from "../components/Sign/InputField";
import { Link } from "react-router-dom";
import { LoginType } from "../types/Sign";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginType>({ mode: "onSubmit" });

  const onLoginValid = (data: LoginType) => {
    console.log(data);
  };
  return (
    <section className="sign-container">
      <img
        src="/images/introduce.png"
        alt="소개이미지"
        className="sign-introduce"
      />
      <div className="login-container">
        <div className="login-form-top">
          <h1>로그인</h1>
          <div>
            <span>아이디 찾기</span>
            <span>비밀번호 찾기</span>
          </div>
        </div>
        <form
          className="login-form-section"
          onSubmit={handleSubmit(onLoginValid)}
        >
          <InputField
            name="loginId"
            placeholder="아이디"
            register={register}
            error={errors.loginId}
            
          />
          <InputField
            name="loginPw"
            placeholder="비밀번호"
            register={register}
            error={errors.loginPw}
          />
          <button type="submit">로그인</button>
        </form>
        <div className="login-form-bottom">
          <p>계정이 없으신가요? PICKIT 커뮤니티에 참여해주세요!</p>
          <Link to="/register">계정 생성</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
