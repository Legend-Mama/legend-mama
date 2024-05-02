"use client";

import { ReactNode } from "react";
import ChakraProvider from "./providers/ChakraProvider";
import { AuthProvider } from "./providers/AuthProvider";

/**
 * Wraps our entire application, allowing it to use third party providers
 * and any custom contexts. Wraps the children in the `body` of [layout.tsx](./layout.tsx)
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
