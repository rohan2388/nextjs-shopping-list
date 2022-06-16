import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  primary: "#52796F",
  primary1x: "#5f897d",
  primary2x: "#78a297",
  primary1xd: "#334c46",
  primary2xd: "#1b2f2a",

  secondary: "#354F52",
  secondary1x: "#48686b",
  secondary2x: "#5e858a",
  secondary1xd: "#1b2e2f",
  secondary2xd: "#001111",

  accent: "#84A98C",
  accent1x: "#95b69c",
  accent2x: "#b2ccb8",
  accent1xd: "#5e8767",
  accent2xd: "#5e8767",

  dark: "#2F3E46",
  dark1x: "#4a5f6a",
  dark2x: "#5f7a87",
  dark1xd: "#1c2930",
  dark2xd: "#001014",

  light: "#CAD2C5",
  light1x: "#d7ded2",
  light2x: "#eef6eb",
  light1xd: "#a4b19b",
  light2xd: "#a4b19b",

  borderColor: "#84a98c50",
};

const sizes = {
  appbar: "5rem",
  list: "calc(100vh - 5rem)",
};

const fonts = {
  heading: "Yrsa",
  body: "Maven Pro",
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: "light",
      color: "dark",
    },
  }),
};

const space = {};

const theme = extendTheme({ config, colors, sizes, fonts, styles, space });
// console.log(theme);
export default theme;
