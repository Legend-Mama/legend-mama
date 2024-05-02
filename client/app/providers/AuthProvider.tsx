import {
  FirebaseApp,
  FirebaseError,
  getApp,
  initializeApp,
} from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  Auth,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

/** These don't have to be secrets per docs: https://firebase.google.com/docs/projects/api-keys
 * But we'll store them in ENV in case they change
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
} as const;

interface AuthContextType {
  auth: Auth | null;
  loggedIn: boolean;
  user: User | null;
}

const defaultContext = {
  auth: null,
  loggedIn: false,
  user: null,
} as const;

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<AuthContextType>(() => {
    const ctx: AuthContextType = { ...defaultContext };
    let app: FirebaseApp;

    // Try to ensure that we only initialize the Firebase app once - might need debugging

    try {
      app = getApp("legend-mama");
    } catch (err: any) {
      if (err.name === "FirebaseError") {
        app = initializeApp(firebaseConfig, "legend-mama");
      } else {
        throw err;
      }
    }

    ctx.auth = getAuth(app);

    // Use emulator on local

    if (process.env.NODE_ENV === "development") {
      connectAuthEmulator(ctx.auth, "http://127.0.0.1:9099");
    }

    // Register auth observer
    onAuthStateChanged(ctx.auth, (user) => {
      if (user) {
        setContext((ctx) => ({ ...ctx, loggedIn: true }));
        setContext((ctx) => ({ ...ctx, user }));
      } else {
        setContext((ctx) => ({ ...ctx, loggedIn: false }));
        setContext((ctx) => ({ ...ctx, user: null }));
      }
    });

    return ctx;
  });

  const contextMemo = useMemo(() => context, [context]);

  return (
    <AuthContext.Provider value={contextMemo}>{children}</AuthContext.Provider>
  );
}
