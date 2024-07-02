import { ErrorOption } from "react-hook-form";

export interface InputType {
    //InputField.tsx
    name: string;
    placeholder: string;
    register: any;
    error: undefined | ErrorOption;
  }