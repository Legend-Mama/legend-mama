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
  GoogleAuthProvider,
} from "firebase/auth";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

/** These don't have to be secrets per docs: https://firebase.google.com/docs/projects/api-keys
 */
const firebaseConfig = {
  apiKey: "AIzaSyBwVZfuUNAFPesdG2ETmQUiCtnGyS7UTD0",
  authDomain: "legend-mama.firebaseapp.com",
  projectId: "legend-mama",
  storageBucket: "legend-mama.appspot.com",
  messagingSenderId: "780538328126",
  appId: "1:780538328126:web:38ddfd7e5e662ddc29cd6f",
} as const;

interface AuthContextType {
  auth: Auth | null;
  loggedIn: boolean;
  user: User | null;
  providers: { google: GoogleAuthProvider | null };
}

const defaultContext: AuthContextType = {
  auth: null,
  loggedIn: false,
  user: null,
  providers: { google: null },
} as const;

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<AuthContextType>(() => {
    const ctx: AuthContextType = { ...defaultContext };
    let app: FirebaseApp;

    // Initialize Firebase auth
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

    // Initialize auth providers
    const googleAuthProvider = new GoogleAuthProvider();
    ctx.providers.google = googleAuthProvider;

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
