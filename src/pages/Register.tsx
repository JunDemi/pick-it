import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../assets/Sign/sign.scss";
import InputField from "../components/Sign/InputField";
import { Link } from "react-router-dom";
import { RegisterType } from "../types/Sign";

function Register() {
  //프로필 이미지 프리뷰 상태 및 관리
    const [preview, setPreview] = useState<string | null>(null);
    const getPreview = (fileImg: File | null) => {
      if (fileImg) {
        if(fileImg.size >= 2097152){ //파일이 2MB이상일 경우 리턴
          alert("파일 용량이 초과되었습니다.");
        }else{
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(fileImg);
        }
      } else {
        setPreview(null);
      }
    }
  //리액트 훅 폼
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<RegisterType>({ mode: "onSubmit" });

  //폼 이벤트
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
                  <InputField
                    name="registerNickName"
                    register={register}
                    error={errors.registerNickName}
                  />
                </td>
                <td>
                  <button className="nickname-check">중복확인</button>
                </td>
                <td>
                  <p>*(특수문자 제외, 4~16자)</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h1>아이디</h1>
                </td>
                <td colSpan={3}>
                  <InputField
                    name="registerId"
                    register={register}
                    error={errors.registerId}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <h1>비밀번호</h1>
                </td>
                <td colSpan={2}>
                  <InputField
                    name="registerPw"
                    register={register}
                    error={errors.registerPw}
                  />
                </td>
                <td>
                  <p>*(영문대소문자/숫자, 10~16자)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h1>프로필 이미지</h1>
                </td>
                <td>
                  <label htmlFor="pImg">
                    <div>
                      {preview ? 
                      <img
                      src={preview}
                      alt="이미지 프리뷰"
                      />
                      :
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                      }
                      
                    </div>
                    <input 
                    type="file" 
                    accept="image/*" 
                    {...register("registerImg", {
                      required: false,
                    })}
                    onChange={({ target }: any) => {
                      target ? getPreview(target.files[0]) : getPreview(null);
                    }}
                    id="pImg"/>
                  </label>
                </td>
                <td></td>
                <td>
                  <p>*(2MB이하, png/jpg/webp파일)</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="register-submit" type="submit">
            계정 생성
          </button>
        </form>
        <div className="register-form-bottom">
          <p>계정이 있으신가요? PICKIT 커뮤니티에 참여해주세요!</p>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
