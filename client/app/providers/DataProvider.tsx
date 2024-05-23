"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "./AuthProvider";
import { usePathname } from "next/navigation";

interface DataContextType {
  user: {
    goldBalance: number | null;
  };
  refresh: () => Promise<void>;
}

const defaultContext: DataContextType = {
  user: { goldBalance: null },
  refresh: async () => {},
} as const;

export const DataContext = createContext<DataContextType>(defaultContext);

export function DataProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const url = usePathname();

  // Keep dontFetch outside of fetchData callback - we don't want the URL to be a dependency of the hook because it will trigger fetchData to be updated, which in turn triggers the useEffect to refetch data
  // We don't want to refetch data every time the URL changes!
  const dontFetch = url === "/auth/signup" || url === "/auth/login";

  const fetchData = useCallback(async () => {
    if (dontFetch) {
      return; // Allow signup to finish initializing user before trying to fetch data
    }
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
  }, [auth.idToken, auth.loggedIn, dontFetch]);

  const [context, setContext] = useState<DataContextType>(() => ({
    ...defaultContext,
    refresh: fetchData,
  }));

  useEffect(() => {
    void fetchData();
  }, [fetchData, auth.idToken, auth.loggedIn]);

  const contextMemo = useMemo(() => context, [context]);

  return (
    <DataContext.Provider value={contextMemo}>{children}</DataContext.Provider>
  );
}
