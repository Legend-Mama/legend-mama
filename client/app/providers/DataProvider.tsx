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
import CharacterSheet from "@/lib/CharacterSheet";

export interface DataContextType {
  user: {
    goldBalance: number | null;
    charSheets: { id: string; name: string }[];
  };
  refresh: () => Promise<void>;
  clearData: () => Promise<void>;
  loading: boolean;
  error: boolean;
}

const defaultContext: DataContextType = {
  user: { goldBalance: null, charSheets: [] },
  refresh: async () => {},
  clearData: async () => {},
  loading: true,
  error: false,
} as const;

export const DataContext = createContext<DataContextType>(defaultContext);

export function DataProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const url = usePathname();

  // Keep dontFetch outside of fetchData callback - we don't want the URL to be a dependency of the hook because it will trigger fetchData to be updated, which in turn triggers the useEffect to refetch data
  // We don't want to refetch data every time the URL changes!
  const dontFetch = url === "/auth/signup" || url === "/auth/login" || url === "/auth/logout";

  const fetchData = useCallback(async () => {
    if (dontFetch) {
      return; // Allow signup to finish initializing user before trying to fetch data
    }
    if (auth.loggedIn && auth.idToken) {
      setContext((ctx) => ({ ...ctx, loading: true }));

      const promises = [];

      // Update gold balance & id token
      promises.push(
        (async () => {
          try {
            const resp = await fetch(
              process.env.NEXT_PUBLIC_API + "/account/gold-balance",
              {
                headers: {
                  Authorization: `Bearer ${auth.idToken}`,
                },
              }
            );
            if (resp.status !== 200) throw "Error";
            return await resp.json();
          } catch {
            return null;
          }
        })()
      );

      // Get character sheets
      promises.push(
        (async () => {
          try {
            const resp = await fetch(
              process.env.NEXT_PUBLIC_API + "/account/character-sheets",
              {
                headers: {
                  Authorization: `Bearer ${auth.idToken}`,
                },
              }
            );
            if (resp.status !== 200) throw "Error";
            return await resp.json();
          } catch {
            return null;
          }
        })()
      );

      const [goldData, charSheetData] = await Promise.all(promises);

      if (!goldData || !charSheetData) {
        console.error("Error while fetching account data");
        setContext((ctx) => ({
          ...ctx,
          loading: false,
          error: true,
        }));
        return;
      }

      setContext((ctx) => ({
        ...ctx,
        user: { goldBalance: goldData.goldBalance, charSheets: charSheetData },
        loading: false,
        error: false,
      }));
    }
  }, [auth.idToken, auth.loggedIn, dontFetch]);

  const [context, setContext] = useState<DataContextType>(() => ({
    ...defaultContext,
    refresh: fetchData,
    clearData: async () => {
      setContext(defaultContext);
    }
  }));

  useEffect(() => {
    void fetchData();
  }, [fetchData, auth.idToken, auth.loggedIn]);

  const contextMemo = useMemo(() => context, [context]);

  return (
    <DataContext.Provider value={contextMemo}>{children}</DataContext.Provider>
  );
}
