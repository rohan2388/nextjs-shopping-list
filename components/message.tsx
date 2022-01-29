import { Flex, Text } from "@chakra-ui/react";

const Message = ({ text = "" }: { text: string }): JSX.Element => {
  return (
    <Flex alignItems='center' justifyContent='center' h='50vh' color='accent'>
      <Text>{text}</Text>
    </Flex>
  );
};
export default Message;
