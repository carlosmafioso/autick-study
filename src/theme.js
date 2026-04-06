import { createSystem, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#003178" },
        secondary: { value: "#005faf" },
        tertiary: { value: "#5e2300" },
        background: { value: "#f8f9fa" },
        surface: { value: "#f8f9fa" },
        error: { value: "#ba1a1a" },
      },
      fonts: {
        heading: { value: "'Manrope', sans-serif" },
        body: { value: "'Manrope', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        "on-surface": { value: "#191c1d" },
        "primary-container": { value: "#0d47a1" },
        "tertiary-container": { value: "#823400" },
      },
    },
  },
});

export const system = createSystem(config);
export default system;
