import { ReactNode } from "react";
import { Heading as HeadingChakra } from "@chakra-ui/react";

type TitleProps = {
  children?: ReactNode;
};

export const Titlecontent = ({ children }: TitleProps) => (
  <HeadingChakra as="h2" size="xl">
    {children}
  </HeadingChakra>
);
