import type { NextPage } from "next";
import Appbar from "components/appbar";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Item from "components/item";
import MainForm from "components/mainForm";
import { deleteItem, useShoppingList } from "firestore";

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
                key={doc.id}
                name={doc.data.name}
                quantity={doc.data.quantity}
                onDelete={() => {
                  deleteItem(doc.id);
                }}
              />
            );
          })}
        </Stack>
      )}
      {loading && (
        <Flex
          alignItems='center'
          justifyContent='center'
          h='50vh'
          color='accent'
        >
          <Text>Loading...</Text>
        </Flex>
      )}

      <MainForm />
    </Box>
  );
};

export default Home;
