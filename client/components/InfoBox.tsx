import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import Text from "./typography/Text";

export default function InfoBox({
  children,
  ...props
}: {
  children: ReactNode;
} & FlexProps) {
  return (
    <Flex
      borderRadius={20}
      bg="#464077"
      alignItems="center"
      py="20px"
      px="12px"
      {...props}
    >
      <Text
        color="#E4DFFF"
        fontSize={14}
        fontWeight={600}
        fontFamily="var(--font-source-sans)"
        m="unset"
      >
        {children}
      </Text>
    </Flex>
  );
}
