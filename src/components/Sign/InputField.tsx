import React from 'react';
import { InputType } from '../../types/Sign';

function InputField({name, placeholder, register, error}: InputType) {
  return (
   <>
    <input type='text' {...register(name, {
      required: true,
      // validate: {
      //   must: (value: string) => value.length > 6 || ""
      // },
    })}
    placeholder={placeholder}
    autoComplete='off'/>
    <p className='input-error-message'>{error?.message}</p>
   </>
  );
}

export default InputField;
