import React from "react";
import { FormLabel } from "@chakra-ui/react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <FormLabel htmlFor={htmlFor}>{children}</FormLabel>;
};

export default Label;
