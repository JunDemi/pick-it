import { ErrorOption } from "react-hook-form";

export interface InputType {
  //InputField.tsx
  name: string;
  type: string;
  placeholder?: string;
  register: any;
  error: undefined | ErrorOption;
}
export interface RegisterType {
  registerNickName: string;
  registerId: string;
  registerPw: string;
  registerImg: FileList;
}
export interface LoginType {
  loginId: string;
  loginPw: string;
}
export interface UserFind {
  inputText: string;
}
export interface PopupUserData {
  nickName: string;
  imgUrl: string;
}

export interface LocalUserData {
  UserId: string;
  LoginToken: string;
}
