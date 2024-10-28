import { useEffect, useState } from "react";
import { Flex, Input, Button, Box, Toast, Icon } from "@chakra-ui/react";
import { UserType } from "../../../types/usertype";
import { users } from "../../../services/users/users";
import DataTable from "react-data-table-component";
import { FaTimes } from "react-icons/fa";
import AddUserModal from "../modals/AddUserModal";
import ExpandableRow from "./ExpandableRow"; // Importa el nuevo componente

const TableUsers = () => {
  const [usersdata, setUsersData] = useState<UserType[]>([]); // Estado para almacenar los usuarios
  const [filterText, setFilterText] = useState("");

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
      selector: (row: UserType) => row.feultimocambiopassword.toISOString(), // Convertir Date a string
      cell: (row: UserType) => row.feultimocambiopassword.toLocaleDateString(), // Mostrar la fecha en formato legible
      sortable: true,
    },
    {
      name: "Último Ingreso",
      selector: (row: UserType) => row.feultimoingreso.toISOString(), // Convertir Date a string
      cell: (row: UserType) => row.feultimoingreso.toLocaleDateString(), // Mostrar la fecha en formato legible
      sortable: true,
    },
    {
      sortable: true,
    },
  ];

  const data = usersdata;
  const [filteredData, setFilteredData] = useState(data);

  // Función para editar un usuario
  const handleEditUser = async (userId: number) => {
    try {
      console.info(userId);
      // Aquí abrirías el formulario de edición
      // Puedes llamar a la API de editar usuario si ya tienes los datos listos
    } catch (error) {
      Toast({
        title: "Error al editar usuario",
        status: "error",
        isClosable: true,
      });
    }
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

        <Input
          placeholder="Filtrar por nombre"
          value={filterText}
          onChange={handleFilter}
          borderRadius="0"
          height="24px"
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
        ></Button>
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
    </Box>
  );
};
export default TableUsers;
