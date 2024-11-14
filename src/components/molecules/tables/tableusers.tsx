import { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Button,
  Box,
  Toast,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { UserType } from "../../../types/usertype";
import { users } from "../../../services/users/users";
import { FaTimes } from "react-icons/fa";
import AddUserModal from "../modals/AddUserModal";
import UpdateUserModal from "../modals/UpdateUserModal";
import Dialog from "../Dialog/Dialog";
import ExpandableRow from "./ExpandableRow"; // Importa el nuevo componente
import { services } from "../../../services";

const TableUsers = () => {
  const [usersdata, setUsersData] = useState<UserType[]>([]);
  const [filterText, setFilterText] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterUsers, setFilterUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await users.AllUsers();
        setFilterUsers(response);
        setUsersData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns: {
    label: string;
    name: keyof UserType | "Info";
    sortable: boolean;
    width?: string;
  }[] = [
    {
      label: "Nombre",
      name: "nombre",
      sortable: true,
      width: "200px",
    },
    {
      label: "Usuario",
      name: "usuario",
      sortable: true,
      width: "200px",
    },
    {
      label: "Email",
      name: "email",
      sortable: true,
      width: "200px",
    },
    {
      label: "Tipo",
      name: "tipo",
      sortable: true,
      width: "200px",
    },
    {
      label: "Empresa",
      name: "empresa",
      sortable: true,
      width: "200px",
    },
    {
      label: "Sucursal",
      name: "sucursal",
      sortable: true,
      width: "200px",
    },
    {
      label: "Area",
      name: "area",
      sortable: true,
      width: "200px",
    },
    {
      label: "Perfil",
      name: "perfil",
      sortable: true,
      width: "200px",
    },
    {
      label: "Expiración de contraseña",
      name: "diasexpirapassword",
      sortable: true,
      width: "200px",
    },
    {
      label: "Último Cambio de Contraseña",
      name: "feultimocambiopassword",
      sortable: true,
      width: "200px",
    },
    {
      label: "Último Ingreso",
      name: "feultimoingreso",
      sortable: true,
      width: "200px",
    },
    {
      label: "Info",
      name: "Info",
      sortable: true,
      width: "200px",
    },
  ];

  // Función para editar un usuario
  const handleEditUser = (userId: number) => {
    setEditUserId(userId);
    setIsEditModalOpen(true);
  };

  // Función para refrescar la contraseña del usuario
  const handleRefreshPassword = async (userId: number) => {
    try {
      await users.refreshpassword(userId);
      Toast({
        title: "Contraseña refrescada exitosamente",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      Toast({
        title: "Error al refrescar contraseña",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Función para habilitar/deshabilitar un usuario
  const handleToggleUser = async (userId: number, newStatus: string) => {
    try {
      console.info(userId);
      if (newStatus == "NO") {
        services.users.enableduser(userId);
      }
      if (newStatus == "SI") {
        services.users.disableduser(userId);
      }

      Toast({
        title: `Usuario ${
          newStatus ? "habilitado" : "deshabilitado"
        } exitosamente`,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      Toast({
        title: "Error al cambiar el estado del usuario",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleFilter = (e: any) => {
    const text = e.target.value.toLowerCase();

    setFilterText(text);

    const newFilter = usersdata.filter((user) => {
      return (
        user.nombre.toLowerCase().includes(text) ||
        user.usuario.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text) ||
        user.tipo.toLowerCase().includes(text) ||
        user.empresa.toLowerCase().includes(text) ||
        user.sucursal.toLowerCase().includes(text) ||
        user.area.toLowerCase().includes(text) ||
        user.perfil.toLowerCase().includes(text) ||
        user.diasexpirapassword.toString().includes(text) ||
        user.feultimocambiopassword.toString().includes(text) ||
        user.feultimoingreso.toString().includes(text)
      );
    });

    setFilterUsers(newFilter);
  };

  const clearFilter = () => {
    setFilterText("");
    setFilterUsers(usersdata);
  };

  return (
    <Box>
      <Flex mb={4} minWidth="max-content" alignItems="center" gap="2">
        {/* Botón para agregar un nuevo usuario */}
        <Box p="2">
          <AddUserModal />
        </Box>

        <Flex alignItems={"center"}>
          <Input
            w={"14rem"}
            placeholder="Buscar..."
            value={filterText}
            onChange={handleFilter}
            borderRadius="0"
            height="34px"
            color={"gray.200"}
          />
          <Button
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderTopRightRadius="5px"
            borderBottomRightRadius="5px"
            height="34px"
            width="20px"
            onClick={clearFilter}
          >
            <Icon as={FaTimes} boxSize={4} />
          </Button>
        </Flex>
      </Flex>

      <TableContainer
        bg={"gray.800"}
        borderColor={"gray.700"}
        borderRadius="md"
        borderWidth={"2px"}
        height={"fit-content"}
        opacity={0.8}
        color={"gray.200"}
        p={2}
      >
        <Table>
          <Thead>
            <Tr>
              {columns &&
                columns.map((column, index) => (
                  <Th key={index}>{column.label}</Th>
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {filterUsers.map((user, index) => (
              <Tr key={index}>
                {columns.map((column, index) => {
                  if (column.name === "Info") {
                    return (
                      <Dialog buttonLabel={"ver mas"}>
                        <ExpandableRow
                          data={user}
                          onEdit={() => handleEditUser(user.idusuario)}
                          onRefreshPassword={() =>
                            handleRefreshPassword(user.idusuario)
                          }
                          onToggleUser={() =>
                            handleToggleUser(user.idusuario, user.hab)
                          }
                        />
                      </Dialog>
                    );
                  }
                  return <Td key={index}>{String(user[column.name])}</Td>;
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {isEditModalOpen && editUserId && (
        <UpdateUserModal
          userId={editUserId}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </Box>
  );
};
export default TableUsers;
