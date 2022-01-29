import {
  Box,
  Flex,
  Heading,
  Text,
  useBoolean,
  useOutsideClick,
} from "@chakra-ui/react";
import { ShoppingListItemSnapshot } from "libs/firestore";
import { useRef } from "react";
import { MdClose } from "react-icons/md";

const Item = ({
  item,
  onDelete = () => {},
}: {
  item: ShoppingListItemSnapshot;
  onDelete?: () => void;
}): JSX.Element => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isActive, setActive] = useBoolean();
  useOutsideClick({
    ref: itemRef,
    handler: () => {
      setActive.off();
    },
  });

  return (
    <Box
      ref={itemRef}
      position='relative'
      py='5'
      px='8'
      borderBottom='1px'
      borderColor='borderColor'
      onClick={() => setActive.on()}
    >
      <Box>
        <Heading as='h3' fontSize='2xl' lineHeight='short'>
          {item.data.name}

          {item.data.urgent && (
            <Text
              as='span'
              ml='3'
              fontSize='sm'
              color='red'
              position='relative'
              top={-1}
            >
              🚩
            </Text>
          )}
        </Heading>
        <Text fontSize='md' lineHeight='none' fontWeight='medium' opacity='0.8'>
          {item.data.quantity}
        </Text>
      </Box>
      <Flex
        position='absolute'
        right='0'
        top='0'
        alignItems='center'
        justifyContent='center'
        w='14'
        h='full'
        fontSize='2xl'
        bg='red.500'
        color='white'
        hidden={!isActive}
        boxShadow='lg'
        onClick={onDelete}
      >
        <MdClose />
      </Flex>
    </Box>
  );
};
export default Item;
