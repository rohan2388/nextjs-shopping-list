import {
  Box,
  Button as ChakraButton,
  Heading,
  Stack,
  Text,
  SpaceProps,
} from "@chakra-ui/react";
import { ChakraMargin } from "libs/types";

interface ButtonProps extends ChakraMargin {
  title: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
export function Button({
  title,
  onClick,
  margin,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <ChakraButton
      bg="dark"
      color={"light"}
      _hover={{
        bg: "primary1x",
      }}
      _active={{
        bg: "primary1x",
      }}
      onClick={onClick}
      {...margin}
      disabled={disabled}
    >
      {title}
    </ChakraButton>
  );
}
