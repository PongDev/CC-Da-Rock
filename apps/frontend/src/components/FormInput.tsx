import {
  FormControl,
  FormLabel,
  Input,
  forwardRef,
  FormControlProps,
} from "@chakra-ui/react";

export const FormInput = forwardRef<FormControlProps, "input">((props, ref) => {
  const { label, type, ...rest } = props;

  return (
    <FormControl>
      <FormLabel fontWeight="bold">{label}</FormLabel>
      <Input
        variant="filled"
        type={type}
        size="lg"
        shadow="lg"
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
});
