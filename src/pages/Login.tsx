import React from "react";
import "../assets/Sign/sign.scss";
import { useForm } from "react-hook-form";
import InputField from "../components/Sign/InputField";

function Login() {
    const {handleSubmit, register, formState:{errors}, reset} = useForm({ mode: "all" });
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
        <form className="login-form-section">
            <InputField name="loginId" placeholder="아이디" register={register} error={errors.loginId}/>
        </form>
      </div>
    </section>
  );
}

export default Login;
