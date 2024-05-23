import { Button as CButton, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Button({
  glow,
  children,
  secondary,
  highlight = false,
  ...props
}: {
  children: ReactNode;
  secondary?: boolean;
  glow?: boolean;
  highlight?: boolean;
  props?: any;
} & ButtonProps): ReactNode {
  return (
    <CButton
      backgroundColor={highlight ? "#D7C5A0" : secondary ? "unset" : "gray.900"}
      borderWidth={2}
      borderColor="#D7C5A0"
      color={highlight ? "#3A2F15" : "#EBE1D4"}
      fontSize="smaller"
      borderRadius={10}
      _hover={{
        backgroundColor: secondary ? "gray.900" : "gray.700",
        ...(highlight && { color: "#EBE1D4" }),
      }}
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
