import {
  InputGroup as CInputGroup,
  Input,
  InputLeftAddon,
  InputProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export default function InputGroup({
  left,
  leftWidth,
  stackPosition = "alone",
  serif = false,
  highlight = false,
  ...props
}: {
  left?: ReactNode | string;
  leftWidth?: number | string;
  stackPosition?: "top" | "mid" | "alone" | "bottom";
  serif?: boolean;
  highlight?: boolean;
} & InputProps) {
  let leftAddonBorders;
  let inputBorders;
  switch (stackPosition) {
    case "top":
      leftAddonBorders = { borderBottomLeftRadius: 0 };
      inputBorders = {
        borderBottomRightRadius: 0,
        ...(left && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      };
      break;
    case "mid":
      leftAddonBorders = { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 };
      inputBorders = {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        ...(left && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      };
      break;
    case "bottom":
      leftAddonBorders = { borderTopLeftRadius: 0 };
      inputBorders = {
        borderTopRightRadius: 0,
        ...(left && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      };
      break;
    case "alone":
      inputBorders = {
        ...(left && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      };
  }

  const placeholderStyles = {
    fontFamily: "var(--font-source-sans)",
    color: "gray.400",
    fontWeight: 300,
    fontStyle: "italic",
  };

  return left ? (
    <CInputGroup>
      <label htmlFor={props.name}>
        <InputLeftAddon
          width={leftWidth}
          {...leftAddonBorders}
          fontFamily="var(--font-source-sans)"
          bg="gray.900"
          color="gray.400"
          outline="none"
          fontSize="small"
          fontWeight={600}
          borderColor="gray.700"
          display="flex"
          justifyContent="center"
        >
          {left}
        </InputLeftAddon>
      </label>
      <Input
        id={props.name}
        {...props}
        {...inputBorders}
        bg="gray.600"
        color="white"
        outline="none"
        fontFamily={
          serif ? "var(--font-source-serif)" : "var(--font-source-sans)"
        }
        borderColor="gray.500"
        _placeholder={placeholderStyles}
      />
    </CInputGroup>
  ) : (
    <Input
      {...props}
      {...inputBorders}
      borderColor={highlight ? "#E7C26C" : "#4D4639"}
      bg="#1F1B13"
      color="white"
      fontFamily={
        serif ? "var(--font-source-serif)" : "var(--font-source-sans)"
      }
      borderWidth={2}
    />
  );
}
