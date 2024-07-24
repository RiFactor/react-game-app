import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark", // System sets initial value. 'system' or choose 'light' | 'dark'
  useSystemColorMode: false, // false - App color mode is detached from system color mode changes. or true - App subscribes to system color mode changes.
};

const theme = extendTheme({ config });

export default theme;
