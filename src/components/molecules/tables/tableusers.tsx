import { useEffect, useState } from "react";
import { Flex, Input, Button, Box, Toast, Icon } from "@chakra-ui/react";
import { UserType } from "../../../types/usertype";
import { users } from "../../../services/users/users";
import DataTable from "react-data-table-component";
import { FaTimes } from "react-icons/fa";
import AddUserModal from "../modals/AddUserModal";
import UpdateUserModal from "../modals/UpdateUserModal";
import ExpandableRow from "./ExpandableRow"; // Importa el nuevo componente

const TableUsers = () => {
  const [usersdata, setUsersData] = useState<UserType[]>([]); // Estado para almacenar los usuarios
  const [filterText, setFilterText] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null); // ID del usuario a editar
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await users.AllUsers();
        setUsersData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = usersdata.filter((item) =>
      item.nombre.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [usersdata, filterText]);

  //Datatable info

  const columns = [
    {
      name: "Nombre",
      selector: (row: UserType) => row.nombre,
      sortable: true,
    },
    {
      name: "Usuario",
      selector: (row: UserType) => row.usuario,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: UserType) => row.email,
      sortable: true,
    },
    { name: "Tipo", selector: (row: UserType) => row.tipo, sorteable: true },
    {
      name: "Empresa",
      selector: (row: UserType) => row.empresa,
      sorteable: true,
    },
    {
      name: "Sucursal",
      selector: (row: UserType) => row.sucursal,
      sorteable: true,
    },
    {
      name: "Area",
      selector: (row: UserType) => row.area,
      sorteable: true,
    },
    {
      name: "Perfil",
      selector: (row: UserType) => row.perfil,
      sortable: true,
    },
    {
      name: "Expiración de contraseña",
      selector: (row: UserType) => row.diasexpirapassword, // Columna para los días de expiración
      cell: (row: UserType) =>
        row.diasexpirapassword === 0
          ? "Nunca" // Si el valor es 0, mostrar "Nunca"
          : `${row.diasexpirapassword} días`, // Mostrar el número de días si no es 0
      sortable: true,
    },
    {
      name: "Último Cambio de Contraseña",
      selector: (row: UserType) =>
        new Date(row.feultimocambiopassword).toISOString(),
      cell: (row: UserType) =>
        new Date(row.feultimocambiopassword).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Último Ingreso",
      selector: (row: UserType) => new Date(row.feultimoingreso).toISOString(),
      cell: (row: UserType) =>
        new Date(row.feultimoingreso).toLocaleDateString(),
      sortable: true,
    },
    {
      sortable: true,
    },
  ];

  const data = usersdata;
  const [filteredData, setFilteredData] = useState(data);

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
  const handleToggleUser = async (userId: number, newStatus: boolean) => {
    try {
      console.info(userId);
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
    setFilterText(e.target.value);
  };

  const clearFilter = () => {
    setFilterText("");
  };

  return (
    <Box>
      <Flex mb={4} minWidth="max-content" alignItems="center" gap="2">
        {/* Botón para agregar un nuevo usuario */}
        <Box p="2">
          <AddUserModal />
        </Box>

        <Flex alignItems={'center'}>
          <Input
            w={"14rem"}
            placeholder="Filtrar por nombre"
            value={filterText}
            onChange={handleFilter}
            borderRadius="0"
            height="34px"
          />
          <Button
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderTopRightRadius="5px"
            borderBottomRightRadius="5px"
            height="34px"
            width="42px"
            leftIcon={<Icon as={FaTimes} boxSize={6} />}
            onClick={clearFilter}
          />
        </Flex>
      </Flex>

      <DataTable
        columns={columns}
        data={filteredData}
        selectableRows
        pagination
        expandableRows
        expandableRowsComponent={(props) => (
          <ExpandableRow
            {...props}
            onEdit={handleEditUser}
            onRefreshPassword={handleRefreshPassword}
            onToggleUser={handleToggleUser}
          />
        )}
        subHeader
        persistTableHead
      />
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
