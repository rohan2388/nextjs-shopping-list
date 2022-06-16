import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Button } from "components/button";
import { useFirebaseAuth } from "libs/firestore";
import { useEffect } from "react";

export default function LoginForm() {
  const { signIn } = useFirebaseAuth();

  return (
    <Box p={5} m={5} bg="light1x">
      <Heading as="h1" size="lg" color="dark" letterSpacing="wide">
        Login
      </Heading>
      <Text>Please login to access all features of this app.</Text>
      <Button
        onClick={async () => {
          await signIn();
        }}
        title={
          <>
            <Image
              src="/google-logo.svg"
              width={20}
              height={20}
              alt="Google logo"
            />
            <Text ml={1}>Login using Google</Text>
          </>
        }
        margin={{
          mt: 5,
        }}
      />
    </Box>
  );
}
