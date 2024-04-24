import { Button as CButton, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Button({
  glow,
  children,
  secondary,
  ...props
}: {
  children: ReactNode;
  secondary?: boolean;
  glow?: boolean;
  props?: any;
} & ButtonProps): ReactNode {
  return (
    <CButton
      backgroundColor={secondary ? "unset" : "gray.900"}
      borderWidth={1}
      borderColor="gray.800"
      color="white"
      fontSize="smaller"
      borderRadius={10}
      _hover={{ backgroundColor: secondary ? "gray.900" : "gray.700" }}
      {...props}
      sx={{
        ...(glow && { filter: "drop-shadow(0 0 16px #f1efbb)" }),
        ...props.sx,
      }}
    >
      {children}
    </CButton>
  );
}
