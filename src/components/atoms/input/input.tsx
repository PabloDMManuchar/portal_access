import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps,
} from "@chakra-ui/react";

interface CustomInputProps extends InputProps {
  label?: string; // Opcional
  name: string; // Obligatorio
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<CustomInputProps> = ({
  label,
  name,
  onChange,
  ...props
}) => {
  return (
    <FormControl>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput id={name} name={name} onChange={onChange} {...props} />
    </FormControl>
  );
};

export default Input;
