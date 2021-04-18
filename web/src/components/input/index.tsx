import React from "react";
import { Input as BaseInput, InputProps } from "@chakra-ui/react";

export type IInput = InputProps;

export const Input: React.FC<IInput> = ({ ...rest }) => {
  return (
    <div>
      <BaseInput {...rest} />
    </div>
  );
};