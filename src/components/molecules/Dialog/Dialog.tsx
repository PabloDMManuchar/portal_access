import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";

const Dialog: FC<{ children: React.ReactNode; buttonLabel: string }> = ({
  children,
  buttonLabel,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant="outline" size="sm" color={"gray.200"}>
        {buttonLabel ? buttonLabel : "Open Dialog"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.800"} color={"gray.200"}>
          <ModalHeader>Modificar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={"gray.800"}>
            {children ? children : "Dialog Content"}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dialog;
