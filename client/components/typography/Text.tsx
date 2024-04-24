import { Text as CText, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Text({
  glow,
  children,
  ...props
}: {
  children: ReactNode;
  glow?: boolean;
  props?: any;
} & TextProps): ReactNode {
  return (
    <CText
      mb={2}
      {...props}
      sx={{
        ...(glow && { filter: "drop-shadow(0 0 16px #f1efbb)" }),
        ...props.sx,
      }}
    >
      {children}
    </CText>
  );
}
