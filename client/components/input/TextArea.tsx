import { Textarea as CTextarea, TextareaProps } from "@chakra-ui/react";

export default function TextArea({
  highlight = false,
  subtle = false,
  ...props
}: { highlight?: boolean; subtle?: boolean } & TextareaProps) {
  return (
    <CTextarea
      borderColor={highlight ? "#E7C26C" : "#4D4639"}
      borderWidth={2}
      bg="#2E2921"
      color="#EBE1D4"
      opacity={subtle ? 0.2 : 1}
      fontFamily="var(--font-source-serif)"
      {...props}
    />
  );
}
