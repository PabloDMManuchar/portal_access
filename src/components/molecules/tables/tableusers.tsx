import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Button,
  Box,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { UserType } from "../../../types/usertype";
import { users } from "../../../services/users/users";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddUserModal from "../modals/AddUserModal";
import UpdateUserModal from "../modals/UpdateUserModal";
import Dialog from "../Dialog/Dialog";
import ExpandableRow from "./ExpandableRow";
import { toast } from "sonner";
import { services } from "../../../services";

const TableUsers = () => {
  const [usersdata, setUsersData] = useState<UserType[]>([]);
  const [filterText, setFilterText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Número de filas por página

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await services.users.AllUsers();
        setUsersData(response);
        setFilteredUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { label: "Info", name: "info" },
    { label: "Nombre", name: "nombre" },
    { label: "Usuario", name: "usuario" },
    { label: "Avatar", name: "avatar" },
    { label: "Email", name: "email" },
    { label: "Tipo", name: "tipo" },
    { label: "Empresa", name: "empresa" },
    { label: "Sucursal", name: "sucursal" },
    { label: "Área", name: "area" },
    { label: "Perfil", name: "perfil" },
    { label: "Expiración de Contraseña", name: "diasexpirapassword" },
  ];

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setFilterText(text);

    const filtered = usersdata.filter((user) =>
      Object.values(user).join(" ").toLowerCase().includes(text)
    );
    setFilteredUsers(filtered);
  };

  const clearFilter = () => {
    setFilterText("");
    setFilteredUsers(usersdata);
  };

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleRefreshPassword = async (id: number) => {
    try {
      // Llamada a la API para refrescar la contraseña
      await users.refreshpassword(id);

      // Suponiendo que la API devuelve una respuesta exitosa
      toast.success(
        `La contraseña para el usuario con ID ${id} ha sido actualizada correctamente.`,
        { duration: 2000, closeButton: true }
      );
    } catch (error: any) {
      console.error(
        `Error al refrescar contraseña para el usuario con ID: ${id}`,
        error
      );
      toast.warning(
        `No se pudo actualizar la contraseña para el usuario con ID ${id}.`,
        { duration: 2000, closeButton: true }
      );
    }
  };

  const handleToggleUser = async (id: number, status: string) => {
    try {
      if (status === "SI") {
        await users.disableduser(id);
        toast.success(`El usuario con ID ${id} ha sido deshabilitado.`, {
          duration: 2000,
          closeButton: true,
        });
      }
      if (status === "NO") {
        await users.enableduser(id);
        toast.success(`El usuario con ID ${id} ha sido rehabilitado.`, {
          duration: 2000,
          closeButton: true,
        });
      }
    } catch (error: any) {
      console.error(
        `Error al modificar el estado para el usuario con ID: ${id}`,
        error
      );
      toast.warning(
        `Error al modificar el estado para el usuario con ID: ${id}.`,
        { duration: 2000, closeButton: true }
      );
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Box>
      <Flex
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        textColor={"white"}
      >
        <AddUserModal />
        <Flex>
          <Input
            placeholder="Buscar..."
            value={filterText}
            onChange={handleFilter}
            width="200px"
            borderRadius="md"
          />
          <Button onClick={clearFilter} ml={2}>
            <Icon as={FaTimes} />
          </Button>
        </Flex>
      </Flex>

      <TableContainer bg="gray.800" borderRadius="md" p={4} textColor={"white"}>
        <Table colorScheme="teal">
          <Thead>
            <Tr>
              {columns.map((col, index) => (
                <Th key={index} color="white">
                  {col.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((user, index) => (
              <Tr key={index}>
                <Td>
                  <Dialog buttonLabel={"ver más"}>
                    <ExpandableRow
                      data={user}
                      onEdit={() => handleEditUser(user)}
                      onRefreshPassword={() =>
                        handleRefreshPassword(user.idusuario)
                      }
                      onToggleUser={(id, status) =>
                        handleToggleUser(id, status)
                      }
                    />
                  </Dialog>
                </Td>
                <Td>{user.nombre}</Td>
                <Td>{user.usuario}</Td>
                <Td>{user.avatar}</Td>
                <Td>{user.email}</Td>
                <Td>{user.tipo}</Td>
                <Td>{user.empresa}</Td>
                <Td>{user.sucursal}</Td>
                <Td>{user.area}</Td>
                <Td>{user.perfil}</Td>
                <Td>{user.diasexpirapassword}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          leftIcon={<FaChevronLeft />}
          isDisabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </Button>
        <Text color="white">
          Página {currentPage} de {totalPages}
        </Text>
        <Button
          rightIcon={<FaChevronRight />}
          isDisabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </Button>
      </Flex>

      {/* Modal de edición */}
      <UpdateUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
      />
    </Box>
  );
};

export default TableUsers;
