import { AuthContext } from "@/app/providers/AuthProvider";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

export default function useGoogleSignin() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [waitingForGoogle, setWaitingForGoogle] = useState<boolean>(false);

  if (auth.loggedIn) {
    router.replace("/");
  }

  const handleGoogleSignup = useCallback(() => {
    setWaitingForGoogle(true);
    signInWithPopup(auth.auth!, auth.providers.google!)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((err) => {
        console.error(err.message);
        setWaitingForGoogle(false);
      });
  }, [auth.auth, auth.providers.google, router]);

  return { waitingForGoogle, handleGoogleSignup };
}
