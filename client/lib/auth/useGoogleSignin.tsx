import { AuthContext } from "@/app/providers/AuthProvider";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

export default function useGoogleSignin() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [waitingForGoogle, setWaitingForGoogle] = useState<boolean>(false);

  const handleGoogleSignup = useCallback(async () => {
    try {
      setWaitingForGoogle(true);
      const userCredential = await signInWithPopup(
        auth.auth!,
        auth.providers.google!
      );
      const idToken = await userCredential.user.getIdToken();
      const resp = await fetch(process.env.NEXT_PUBLIC_API + "/account", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (resp.status != 201) {
        throw "Couldn't create account data";
      }
      router.push("/tavern");
    } catch (err: any) {
      console.error(err.message);
      setWaitingForGoogle(false);
    }
  }, [auth.auth, auth.providers.google, router]);

  return { waitingForGoogle, handleGoogleSignup };
}
