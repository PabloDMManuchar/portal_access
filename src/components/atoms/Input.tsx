import React from "react";
import { Input as ChakraInput, FormControl, FormLabel } from "@chakra-ui/react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <FormControl id={name}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </FormControl>
  );
};

export default Input;
