"use client";


import { AuthContext } from "@/app/providers/AuthProvider";
import { DataContext } from "@/app/providers/DataProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Logout() {
  const auth = useContext(AuthContext);
  const data = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    async function logout(): Promise<void> {
      await auth.logoutAuth();
      await data.clearData();
      router.push("/");
    }
    logout();
  }, [auth, data, router]);
  return <></>;
}
