import { Button as ChakraButton, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons"; // Si usas react-icons

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  colorScheme?: string;
  leftIcon?: IconType; // Acepta un ícono de la izquierda
  w?: string; // Cambiado a opcional
  mb?: number; // Cambiado a opcional
};

export const ButtonFomrs = ({
  children,
  onClick,
  colorScheme = "blue",
  leftIcon,
  w = "full", // Asignando un valor por defecto
  mb = 4, // Asignando un valor por defecto
}: ButtonProps) => (
  <ChakraButton
    onClick={onClick}
    colorScheme={colorScheme}
    leftIcon={leftIcon && <Icon as={leftIcon} />}
    w={w} // Pasando la propiedad w
    mb={mb} // Pasando la propiedad mb
    justifyContent="flex-start" // Alinear el contenido a la izquierda
    textAlign="left" // Asegurar que el texto esté alineado a la izquierda
  >
    {children}
  </ChakraButton>
);
