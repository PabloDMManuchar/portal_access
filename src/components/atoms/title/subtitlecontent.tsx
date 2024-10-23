import { ReactNode } from "react";
import { Heading as HeadingChakra } from "@chakra-ui/react";

type SubTitleProps = {
  children?: ReactNode;
};

export const SubTitlecontent = ({ children }: SubTitleProps) => (
  <HeadingChakra as="h4" size="md">
    {children}
  </HeadingChakra>
);
