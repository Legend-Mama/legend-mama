import { Heading, HeadingProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Header({
  glow,
  children,
  ...props
}: {
  children: ReactNode;
  glow?: boolean;
  props?: any;
} & HeadingProps): ReactNode {
  return (
    <Heading
      mb={2}
      {...props}
      sx={{
        ...(glow && { filter: "drop-shadow(0 0 16px #f1efbb)" }),
        ...props.sx,
      }}
    >
      {children}
    </Heading>
  );
}
