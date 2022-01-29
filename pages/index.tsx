import type { NextPage } from "next";
import Appbar from "components/appbar";
import { Box, Stack } from "@chakra-ui/react";
import Item from "components/item";
import MainForm from "components/mainForm";
import { deleteItem, useShoppingList } from "libs/firestore";
import Message from "components/message";

const Home: NextPage = () => {
  const [snapshots, loading] = useShoppingList();

  return (
    <Box>
      <Appbar height='appbar' />
      {!loading && (
        <Stack spacing='none'>
          {snapshots?.map(doc => {
            return (
              <Item
                item={doc}
                key={doc.id}
                onDelete={() => {
                  deleteItem(doc.id);
                }}
              />
            );
          })}
        </Stack>
      )}

      {!loading && snapshots?.length == 0 && <Message text='Empty list' />}
      {loading && <Message text='Loading...' />}

      <MainForm />
    </Box>
  );
};

export default Home;
