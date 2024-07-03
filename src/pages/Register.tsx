import React from "react";
import { useForm } from "react-hook-form";
import "../assets/Sign/sign.scss";
import InputField from "../components/Sign/InputField";
import { Link } from "react-router-dom";
import { RegisterType } from "../types/Sign";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<RegisterType>({ mode: "onSubmit" });

  const onRegisterValid = (data: RegisterType) => {
    console.log(data);
  };
  return (
    <section className="sign-container">
      <img
        src="/images/introduce.png"
        alt="소개이미지"
        className="sign-introduce"
      />
      <div className="register-container">
        <h1 className="register-form-top">계정 생성</h1>
        <form
          className="register-form-section"
          onSubmit={handleSubmit(onRegisterValid)}
        >
          <table>
            <tbody>
            <tr>
              <td>
                <h1>닉네임</h1>
              </td>
              <td>
                <InputField name="registerNickName" register={register} error={errors.registerNickName}/>
              </td>
              <td>
                <button className="nickname-check">중복확인</button>
              </td>
              <td><p>*(영문소문자/숫자, 4~16자)</p></td>
            </tr>

            <tr>
              <td>
                <h1>아이디</h1>
              </td>
              <td colSpan={3}>
              <InputField name="registerId" register={register} error={errors.registerId}/>
              </td>
            </tr>

            <tr>
              <td>
                <h1>비밀번호</h1>
              </td>
              <td colSpan={2}>
              <InputField name="registerPw" register={register} error={errors.registerPw}/>
              </td>
              <td><p>*(영문대소문자/숫자, 10~16자)</p></td>
            </tr>
            </tbody>
          </table>
          <button className="register-submit" type="submit">계정 생성</button>
        </form>
        <div className="register-form-bottom">
          <p>계정이 없으신가요? PICKIT 커뮤니티에 참여해주세요!</p>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
