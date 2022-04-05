import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { apiPrisma } from "@utils/auth";
import { useRouter } from "next/router";
import React from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});

export type SigninFormType = z.infer<typeof schema>;

export const Signin = () => {
  const router = useRouter();
  const form = useForm<SigninFormType>({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async (data: SigninFormType) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      await apiPrisma.post("/signin", { email, password });
      router.push("/");
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      component='form'
      onSubmit={form.onSubmit(onSignup)}
      withBorder
      shadow='md'
      p={30}
      mt={30}
      radius='md'
    >
      <Center>
        {error && (
          <Text sx={{ display: "inline" }} color='red' size='sm'>
            {error}
          </Text>
        )}
      </Center>
      <TextInput
        {...form.getInputProps("email")}
        type='email'
        label='Email'
        mt='sm'
        placeholder='e.g eda@man.com'
        required
      />
      <PasswordInput
        {...form.getInputProps("password")}
        label='Password'
        placeholder='Your password'
        required
        mt='sm'
        id='password'
      />
      <Button loading={isLoading} type='submit' color='green' fullWidth mt='xl'>
        Sign up
      </Button>
    </Paper>
  );
};