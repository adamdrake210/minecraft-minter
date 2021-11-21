import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

type InputFieldProps = {
  name: string;
  error: Error;
  register: any;
  placeholder: string;
  type: "text" | "number";
};

export const InputField = ({
  name,
  error,
  register,
  placeholder,
  type,
}: InputFieldProps) => {
  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel htmlFor={name}>{name}:</FormLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
