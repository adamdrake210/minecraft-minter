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
    <FormControl isInvalid={!!error} isRequired my={4}>
      <FormLabel htmlFor={name} textTransform="uppercase">
        {name}:
      </FormLabel>
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
