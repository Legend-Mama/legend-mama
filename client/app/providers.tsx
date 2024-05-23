import { AuthProvider } from "@/app/providers/AuthProvider";
import { ReactNode } from "react";
import ChakraProvider from "./providers/ChakraProvider";
import { DataProvider } from "./providers/DataProvider";

/**
 * Wraps our entire application, allowing it to use third party providers
 * and any custom contexts. Wraps the children in the `body` of [layout.tsx](./layout.tsx)
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </DataProvider>
    </AuthProvider>
  );
}
