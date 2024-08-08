import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Tabs: {
      baseStyle: {
        tablist: {
          borderColor: "gray", // Cambia el color de la línea horizontal aquí
        },
        tab: {
          _selected: {
            color: "white",
            // bg: "blue.500",
            fontWeight: "bold",
          },
          _hover: {
            color: "gray.200",
          },
        },
      },
    },
  },
});

export default theme;
