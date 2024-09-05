import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "sonner";
import Cookies from "js-cookie";

type TLoginProps = {
  data: {
    message: string;
    statusass: "CAMBIOPASS" | "";
    success: boolean;
    token: string;
    userdata: { idusuario: number; usuario: string; idperfil: number };
  };
};
export const Login: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const isCookies = Cookies.get("accessToken");

  const [tokenCookies, setTokenCookies] = useState<string | undefined>(
    isCookies
  );

  const handleClick = () => setShow(!show);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    toast.success("Sesión cerrada correctamente");
    setTokenCookies(undefined);
  };

  const handleLogin = async () => {
    toast("Consultando usuario...", { duration: 2000 });
    try {
      const result: TLoginProps = await axios.post(
        `${import.meta.env.VITE_API_URL}/access/login`,
        form
      );
      const userLoged = result?.data?.userdata?.usuario;

      toast.success(`Hola ${userLoged}, Bienvenido de nuevo!`);
      const accessToken = result?.data?.token;

      setTokenCookies(accessToken);

      Cookies.set("accessToken", accessToken, { expires: 7 });
      onClose();
    } catch (error: any) {
      console.error(error?.response?.data);
      const message = error?.response?.data ? error?.response?.data : "";
      toast.error(message);
    }
  };

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {tokenCookies ? (
        <Button
          colorScheme="black"
          _hover={{ bg: "white", color: "black" }}
          onClick={handleLogout}
          mr={4}
        >
          Cerrar sesion
        </Button>
      ) : (
        <Button
          variant={"outline"}
          color="white"
          _hover={{ bg: "white", color: "black" }}
          onClick={onOpen}
          mr={4}
        >
          Iniciar sesion
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800">Login</h2>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <div className="w-full max-w-sm rounded-lg shadow-md bg-white overflow-hidden">
              <div className="px-6 py-4 space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="usuario"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Usuario
                  </label>
                  <Input
                    onChange={onChange}
                    variant="flushed"
                    size="md"
                    name="usuario"
                    type="text"
                    placeholder="Ingrese su usuario"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <InputGroup size="md">
                    <Input
                      onChange={onChange}
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      variant="flushed"
                      size="md"
                      name="password"
                      // type="password"
                      placeholder="Ingrese su contraseña"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {!show ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 flex justify-end ">
                <Button
                  variant={"outline"}
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  CERRAR
                </Button>
                <Button colorScheme="blue" onClick={handleLogin}>
                  ACCEDER
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
