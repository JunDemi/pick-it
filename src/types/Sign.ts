import { ErrorOption } from "react-hook-form";

export interface InputType {
    //InputField.tsx
    name: string;
    placeholder?: string;
    register: any;
    error: undefined | ErrorOption;
  }
export interface RegisterType {
    registerNickName: string;
    registerId: string;
    registerPw: string;
    registerImg?: File;
}
export interface LoginType {
    loginId: string;
    loginPw: string;
}
