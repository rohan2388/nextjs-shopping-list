import {
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  useBoolean,
  useControllableState,
  Text,
} from "@chakra-ui/react";
import { createItem } from "libs/firestore";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdClose } from "react-icons/md";

export type FormDataType = {
  name: string;
  quantity: string;
  urgent: boolean;
};

const Field = ({
  size = "small",
  placeholder = "",
  onChange = () => {},
  defaultValue = "",
  value: valueProp,
}: {
  size?: "large" | "small";
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
}): JSX.Element => {
  const sizes = {
    fontSize: "md",
    h: "10",
  };
  if (size == "large") {
    sizes.fontSize = "2xl";
    sizes.h = "14";
  }

  const [valueState, setValue] = useControllableState<string>({
    defaultValue,
    value: valueProp,
    onChange,
  });

  return (
    <Input
      fontSize={sizes.fontSize}
      h={sizes.h}
      placeholder={placeholder}
      borderColor='primary'
      fontWeight='semibold'
      variant='flushed'
      value={valueState}
      onChange={e => {
        setValue(e.currentTarget.value);
      }}
      sx={{
        "::placeholder": {
          color: "primary",
          fontStyle: "italic",
          fontWeight: "normal",
        },
      }}
    />
  );
};

const TheForm = ({
  onClose,
  isActive = false,
}: {
  isActive?: boolean;
  onClose?: () => void;
}): JSX.Element => {
  const defaultData: FormDataType = {
    name: "",
    quantity: "",
    urgent: false,
  };
  const [formData, setFormData] = useState(defaultData);
  const [processing, setProcessing] = useBoolean(false);

  const submit = (): void => {
    setProcessing.on();
    createItem({
      name: formData.name,
      quantity: formData.quantity,
      urgent: formData.urgent,
    }).then(() => {
      setProcessing.off();
      setFormData({ ...defaultData });
      if (onClose) onClose();
    });
  };

  return (
    <Stack
      position='fixed'
      w='full'
      bottom='0'
      left='0'
      bg='accent'
      py='16'
      px='5'
      spacing='5'
      hidden={!isActive}
    >
      <Button
        variant='unstyled'
        alignItems='center'
        display='flex'
        justifyContent='center'
        fontSize='2xl'
        bg='transparent'
        color='dark'
        position='absolute'
        top='1'
        right='1'
        onClick={onClose}
      >
        <MdClose />
      </Button>

      <Stack spacing='5'>
        <Field
          placeholder='Item...'
          size='large'
          value={formData.name}
          onChange={v => setFormData({ ...formData, ...{ name: v } })}
        />

        <Field
          placeholder='Quantity...'
          value={formData.quantity}
          onChange={v => setFormData({ ...formData, ...{ quantity: v } })}
        />

        <Stack direction='row' align='center' spacing='8' justify='flex-end'>
          <Stack isInline align='center'>
            <Text fontSize='md' fontWeight='normal'>
              Urgent??
            </Text>
            <Switch
              isChecked={formData.urgent}
              onChange={v =>
                setFormData({
                  ...formData,
                  ...{ urgent: v.currentTarget.checked },
                })
              }
              size='md'
              colorScheme='teal'
              sx={{
                ".chakra-switch__track": {
                  bg: "primary2x",
                },
                ".chakra-switch__track[data-checked]": {
                  bg: "primary1x",
                },
                ".chakra-switch__thumb": {
                  bg: "primary1x",
                },
                ".chakra-switch__track[data-checked] .chakra-switch__thumb": {
                  bg: "primary1xd",
                },
              }}
            />
          </Stack>
          <Button
            h='10'
            px='4'
            pr='5'
            bg='primary'
            color='white'
            _hover={{
              bg: "primary1x",
            }}
            _active={{
              bg: "primary1x",
            }}
            leftIcon={<GoPlus />}
            disabled={processing}
            onClick={submit}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MainForm = (): JSX.Element => {
  const [active, setActive] = useBoolean(false);

  return (
    <>
      <TheForm isActive={active} onClose={() => setActive.off()} />
      <Button
        h='10'
        position='fixed'
        bottom='5'
        right='5'
        zIndex='sticky'
        bg='accent'
        color='dark'
        _hover={{
          bg: "accent1x",
        }}
        onClick={() => setActive.on()}
        hidden={active}
      >
        <GoPlus />
      </Button>
    </>
  );
};

export default MainForm;
