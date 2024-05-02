import Button from "./Button";
import { Roboto } from "next/font/google";
import googleG from "@/public/img/google-g.png";
import Image from "next/image";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function GoogleSignInButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      secondary
      bg="#131314"
      border="#8E918F 1px solid"
      fontSize="14px"
      color="#e3e3e3"
      px="12px"
      py="10px"
    >
      <Image src={googleG} height={20} width={20} style={{ marginRight: 10 }} alt="Google icon" />
      <span className={roboto.className}>Continue with Google</span>
    </Button>
  );
}
