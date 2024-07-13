import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../assets/Sign/sign.scss";
import { Link } from "react-router-dom";
import { RegisterType } from "../types/Sign";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../server/firebase";

const specialLetters: RegExp =
  /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

function Register() {
  //프로필 이미지 프리뷰 상태 및 관리
  const [preview, setPreview] = useState<string | null>(null);
  const getPreview = (fileImg: File | null) => {
    if (fileImg) {
      if (fileImg.size >= 2097152) {
        //파일이 2MB이상일 경우 리턴
        alert("파일 용량이 초과되었습니다.");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(fileImg);
      }
    } else {
      setPreview(null);
    }
  };
  //리액트 훅 폼
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    reset,
  } = useForm<RegisterType>({ mode: "onSubmit" });

  //폼 이벤트
  const onRegisterValid = async (data: RegisterType) => {
    //파이어베이스 사용자 등록 메소드
    await createUserWithEmailAndPassword(
      auth,
      data.registerId + "@pick.it",
      data.registerPw
    );
    reset();
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
                  <input
                    type="text"
                    autoComplete="off"
                    {...register("registerNickName", {
                      required: "*(특수문자 제외, 4~16자)",
                      validate: {
                        min: (value: string) =>
                          value.length >= 4 || "*닉네임은 최소 6자입니다.",
                        max: (value: string) =>
                          value.length <= 16 || "*닉네임은 최대 16자입니다.",
                        letter: (value: string) =>
                          !value.match(specialLetters) ||
                          "*특수문자는 사용할 수 없습니다.",
                      },
                    })}
                  />
                </td>
                <td>
                  <button className="nickname-check">중복확인</button>
                </td>
                <td>
                  <p>
                    {errors.registerNickName
                      ? errors.registerNickName.message
                      : "*(특수문자 제외, 4~16자)"}
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <h1>아이디</h1>
                </td>
                <td colSpan={2}>
                  <input
                    type="text"
                    autoComplete="off"
                    {...register("registerId", {
                      required: "*(특수문자 제외, 4~16자)",
                      validate: {
                        min: (value: string) =>
                          value.length >= 4 || "*아이디는 최소 4자입니다.",
                        max: (value: string) =>
                          value.length <= 16 || "*아이디는 최대 16자입니다.",
                        letter: (value: string) =>
                          !value.match(specialLetters) ||
                          "*특수문자는 사용할 수 없습니다.",
                      },
                    })}
                  />
                </td>
                <td>
                  <p>
                    {errors.registerId
                      ? errors.registerId.message
                      : "*(특수문자 제외, 4~16자)"}
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <h1>비밀번호</h1>
                </td>
                <td colSpan={2}>
                  <input
                    type="text"
                    autoComplete="off"
                    {...register("registerPw", {
                      required: "*(영문대소문자/숫자, 6~16자)",
                      validate: {
                        min: (value: string) =>
                          value.length >= 6 || "*비밀번호는 최소 6자입니다.",
                        max: (value: string) =>
                          value.length <= 16 || "*비밀번호는 최대 16자입니다.",
                      },
                    })}
                  />
                </td>
                <td>
                  <p>
                    {errors.registerPw
                      ? errors.registerPw.message
                      : "*(영문대소문자/숫자, 6~16자)"}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <h1>프로필 이미지</h1>
                </td>
                <td>
                  <label htmlFor="pImg">
                    <div>
                      {preview ? (
                        <img src={preview} alt="이미지 프리뷰" />
                      ) : (
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
                      )}
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
                      id="pImg"
                    />
                  </label>
                </td>
                <td></td>
                <td>
                  <p>*(2MB이하, png/jpg/webp파일)</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="register-submit" type="submit" disabled={isLoading}>
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
