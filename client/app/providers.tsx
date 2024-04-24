"use client";

import { ChakraProvider, DarkMode, defineStyle, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontSize: "2rem",
        fontFamily: "var(--font-jacquard)",
        color: "brand.900",
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "var(--font-source-serif)",
        color: "brand.800",
      },
    },
    Button: {
      baseStyle: {
        fontFamily: "var(--font-source-sans)",
      }
    }
  },
  styles: {
    global: (props: any) => ({ // see https://v2.chakra-ui.com/docs/styled-system/global-styles
      body: {
        bg: "#13120F"
      }
    })
  },
  colors: {
    brand: {
      900: "#EFC665",
      800: "#E8D3A2"
    },
    gray: {
      900: "#2A2929",
      800: "#373736",
      700: "#3E3D3B",
      600: "#666563",
      500: "#868584",
      400: "#E0E0E0"
    }
  }
});

/**
 * Wraps our entire application, allowing it to use third party providers
 * and any custom contexts. Wraps the children in the `body` of [layout.tsx](./layout.tsx)
 */
export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
