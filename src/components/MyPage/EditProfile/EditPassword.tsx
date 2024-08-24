import React from "react";
import { useForm } from "react-hook-form";

function EditPassword(props: {
    userId: string;
    loginToken: string;
}) {
//리액트 훅 폼
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<{
    currentPw: string;
    changePw: string;
  }>({ mode: "onSubmit" });

  //핸들러 이벤트
  const passwordValid = (input: { currentPw: string; changePw: string }) => {
    //두 비밀번호 값이 일치하지 않으면
    if(input.currentPw !== input.changePw) {

    }
  };
  return (
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
                    sameValue: (value: string) =>
                        watch('currentPw') === value || "비밀번호가 일치하지 않습니다."
                  },
                })}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {errors.changePw && <p>{errors.changePw.message}</p>}
      <button type="submit">변경하기</button>
    </form>
  );
}

export default EditPassword;
