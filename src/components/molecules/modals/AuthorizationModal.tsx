import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from "@chakra-ui/react";
import { services } from "../../../services/index";
import { AuthAppType } from "../../../types/apptype";

type AuthorizationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any | null;
  type: "Aplicacion" | "Usuario" | "Area";
};

const AuthorizationModal: React.FC<AuthorizationModalProps> = ({
  isOpen,
  onClose,
  data,
  type,
}) => {
  const [authorizations, setAuthorizations] = useState<AuthAppType[]>([]);

  useEffect(() => {
    const fetchAuthorizations = async () => {
      if (!data) return;
      try {
        let response;
        if (type === "Aplicacion") {
          response =
            await services.applications.AuthApplicationByIdAplicaciones(
              data.idaplicaciones
            );
        } else {
          if (type === "Usuario") {
            response = await services.applications.AuthApplicationByIdUsuario(
              data.idusuario
            );
          } else {
            response =
              await services.applications.AuthApplicationPowerbybByIdArea(
                data.idarea
              );
          }
        }
        setAuthorizations(response);
      } catch (error) {
        console.error("Error al cargar autorizaciones:", error);
      }
    };

    if (data) {
      fetchAuthorizations();
    }
  }, [data, type]);

  const handleAuthToggle = async (authItem: AuthAppType) => {
    const updatedAuth = {
      ...authItem,
      auth: authItem.auth === "true" ? "false" : "true",
    };
    if (authItem.auth === "true") {
      updatedAuth.hab = "NO";
      updatedAuth.auth = "false";
    }
    if (authItem.auth === "false") {
      updatedAuth.hab = "SI";
      updatedAuth.auth = "true";
    }
    if (type != "Area") {
      updatedAuth.idaplicaciones = authItem.idaplicaciones;
      updatedAuth.idusuario = authItem.idusuario;
      updatedAuth.nombre = authItem.nombre;
      updatedAuth.usuario = authItem.usuario;
      const resp = await services.applications.UpdateAuthApplication(
        updatedAuth
      );
    } else {
      updatedAuth.idaplicaciones = authItem.idaplicaciones;
      updatedAuth.idarea = authItem.idarea;
      updatedAuth.nombre = authItem.nombre;
      updatedAuth.area = authItem.area;
      const resp = await services.applications.UpdateAuthApplicationPowerBiB(
        updatedAuth
      );
    }

    setAuthorizations((prevAuth) =>
      prevAuth.map((item) =>
        item.idaplicaciones === authItem.idaplicaciones &&
        item.idusuario === authItem.idusuario
          ? updatedAuth
          : item
      )
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="800px" maxWidth="90%">
        <ModalHeader>
          {type === "Aplicacion"
            ? `Usuarios con acceso a ${data?.nombre || "la aplicación"}`
            : type === "Usuario"
            ? `Aplicaciones a las que tiene acceso ${
                data?.nombre || "el usuario"
              }`
            : `Aplicaciones a las que tiene acceso el área ${data?.area || ""}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {authorizations.length > 0 ? (
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>{type === "Aplicacion" ? "Usuario" : "Aplicación"}</Th>
                  <Th>Autorización</Th>
                  <Th>Habilitación</Th>
                  <Th>Acción</Th>
                </Tr>
              </Thead>
              <Tbody>
                {authorizations.map((auth) => (
                  <Tr key={`${auth.idaplicaciones}-${auth.idusuario}`}>
                    <Td>
                      {type === "Aplicacion" ? auth.usuario : auth.nombre}
                    </Td>
                    <Td>{auth.auth}</Td>
                    <Td>{auth.hab}</Td>
                    <Td>
                      <Button
                        colorScheme={auth.auth === "true" ? "green" : "red"}
                        onClick={() => handleAuthToggle(auth)}
                      >
                        {auth.auth === "true"
                          ? "Quitar Autorización"
                          : "Autorizar"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Center>No hay autorizaciones disponibles</Center>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthorizationModal;
