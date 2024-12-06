import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { users } from "../../services/users/users";
import { useAuth } from "../../context/AuthContext";
import { ChangePasswordType } from "../../types/usertype";

const ChangePasswordForm: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const toast = useToast();
  const { dataUser, loginContext } = useAuth();

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const data: ChangePasswordType = {
        idusuario: dataUser.idusuario,
        oldpassword: oldPassword,
        password,
      };

      await users.changePassword(data);

      toast({
        title: "Contraseña cambiada",
        description: "Tu contraseña ha sido actualizada con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await loginContext({ username: dataUser.usuario, password: password });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al cambiar la contraseña.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full max-w-md max-h-96 p-4 bg-gray-700 border rounded-md border-gray-500">
      <FormControl isRequired mb={4}>
        <FormLabel color="gray.200">Contraseña actual</FormLabel>
        <Input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel color="gray.200">Nueva contraseña</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel color="gray.200">Confirmar nueva contraseña</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="orange"
        width="100%"
        mt={4}
        onClick={handleChangePassword}
        isDisabled={!oldPassword || !password || !confirmPassword}
      >
        Actualizar Contraseña
      </Button>
    </div>
  );
};

export default ChangePasswordForm;
