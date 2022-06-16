import { Stack } from "@chakra-ui/react";
import { deleteItem, useShoppingList } from "libs/firestore";
import Item from "components/item";
import Message from "components/message";

export default function List() {
  const [snapshots, listLoading] = useShoppingList();
  return (
    <>
      <Stack spacing="none">
        {snapshots?.map(doc => {
          return (
            <Item
              item={doc}
              key={doc.id}
              onDelete={() => {
                deleteItem(doc.id).catch(console.error);
              }}
            />
          );
        })}
      </Stack>
      {!listLoading && snapshots?.length == 0 && <Message text="Empty list" />}
      {listLoading && <Message text="Loading..." />}
    </>
  );
}
