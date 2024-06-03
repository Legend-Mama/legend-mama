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
  state: {
    user: {
      goldBalance: number | null;
      charSheets: { id: string; name: string }[];
    };
    loading: boolean;
    error: boolean;
  };
  refresh: () => Promise<void>;
  clearData: () => Promise<void>;
}

const defaultContext: DataContextType = {
  state: {
    user: { goldBalance: null, charSheets: [] },
    loading: true,
    error: false,
  },
  refresh: async () => {},
  clearData: async () => {},
} as const;

export const DataContext = createContext<DataContextType>(defaultContext);

export function DataProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const url = usePathname();

  // Keep dontFetch outside of fetchData callback - we don't want the URL to be a dependency of the hook because it will trigger fetchData to be updated, which in turn triggers the useEffect to refetch data
  // We don't want to refetch data every time the URL changes!
  const dontFetch =
    url === "/auth/signup" || url === "/auth/login" || url === "/auth/logout";

  const [state, setState] = useState<DataContextType["state"]>(
    () => defaultContext.state
  );

  const fetchData = useCallback(async () => {
    if (dontFetch) {
      return; // Allow signup to finish initializing user before trying to fetch data
    }
    if (auth.loggedIn && auth.idToken) {
      setState((exist) => ({ ...exist, loading: true }));

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
        setState((exist) => ({
          ...exist,
          loading: false,
          error: true,
        }));
        return;
      }

      setState((exist) => ({
        ...exist,
        user: { goldBalance: goldData.goldBalance, charSheets: charSheetData },
        loading: false,
        error: false,
      }));
    }
  }, [auth.idToken, auth.loggedIn, dontFetch]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const contextMemo = useMemo<DataContextType>(
    () => ({
      state,
      refresh: fetchData,
      clearData: async () => {
        setState(defaultContext.state);
      },
    }),
    [fetchData, state]
  );

  return (
    <DataContext.Provider value={contextMemo}>{children}</DataContext.Provider>
  );
}
