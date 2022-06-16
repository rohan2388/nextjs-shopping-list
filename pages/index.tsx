import type { NextPage } from "next";
import Appbar from "components/appbar";
import { Box } from "@chakra-ui/react";
import MainForm from "components/mainForm";
import { useFirebaseAuth } from "libs/firestore";
import Message from "components/message";
import List from "components/list";
import LoginForm from "components/loginForm";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { user, getResult, isLoading } = useFirebaseAuth();
  console.log({ isLoading });
  useEffect(() => {
    (async () => {
      await getResult();
    })();
  }, [getResult]);

  return (
    <Box>
      {isLoading && <Message text="Initializing..." />}
      {!isLoading && <Appbar height="appbar" />}
      {!isLoading && user && <List />}
      {!isLoading && user && <MainForm />}
      {!isLoading && !user && <LoginForm />}
    </Box>
  );
};

export default Home;
