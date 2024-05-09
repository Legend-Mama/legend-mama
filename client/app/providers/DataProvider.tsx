"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "./AuthProvider";

interface DataContextType {
  user: {
    goldBalance: number | null;
  };
}

const defaultContext: DataContextType = {
  user: { goldBalance: null },
} as const;

export const DataContext = createContext<DataContextType>(defaultContext);

export function DataProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const [context, setContext] = useState<DataContextType>(() => defaultContext);

  useEffect(() => {
    async function updateData() {
      if (auth.loggedIn && auth.idToken) {
        // Update gold balance & id token
        const resp = await fetch(
          process.env.NEXT_PUBLIC_API + "/account/gold-balance",
          {
            headers: {
              Authorization: `Bearer ${auth.idToken}`,
            },
          }
        );
        if (resp.status != 200) {
          console.error("Error while fetching account data");
          return;
        }
        const respData = await resp.json();
        setContext((ctx) => ({
          ...ctx,
          user: { goldBalance: respData.goldBalance },
        }));
      }
    }
    void updateData();
  }, [auth.idToken, auth.loggedIn]);

  const contextMemo = useMemo(() => context, [context]);

  return (
    <DataContext.Provider value={contextMemo}>{children}</DataContext.Provider>
  );
}
