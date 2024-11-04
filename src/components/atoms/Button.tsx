import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  leftIcon?: IconType;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  leftIcon,
  children,
}) => {
  return (
    <ChakraButton
      type={type}
      onClick={onClick}
      leftIcon={leftIcon ? React.createElement(leftIcon) : undefined} // Crea el ícono si se proporciona
      colorScheme="blackAlpha"
      size="lg"
      mt={4}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
