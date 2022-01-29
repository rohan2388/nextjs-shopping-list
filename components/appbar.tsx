import { Box, Center, Heading } from "@chakra-ui/react";

const Appbar = ({ height = "appbar" }: { height?: string }): JSX.Element => {
  return (
    <>
      <Center
        h={height}
        w='full'
        bg='accent'
        alignItems='center'
        shadow='md'
        position='fixed'
        zIndex='banner'
      >
        <Heading
          as='h1'
          fontSize='2xl'
          textTransform='uppercase'
          fontWeight='bold'
        >
          Shopping List
        </Heading>
      </Center>
      <Box h={height}></Box>
    </>
  );
};
export default Appbar;
