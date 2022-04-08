import React from "react";
import { useQueryClient } from "react-query";
import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { z } from "zod";
import { useModals } from "@mantine/modals";
import axios from "axios";

const schema = z
  .object({
    name: z.string().min(3, { message: "Name should have at least 3 letters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password should have at least 6 letters" }),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Password don"t match',
    path: ["password_confirm"],
  });

export type SignupFormType = z.infer<typeof schema>;

export const Signup = () => {
  const modals = useModals();
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<SignupFormType>({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async (data: SignupFormType) => {
    const { email, name, password } = data;

    setIsLoading(true);
    try {
      await axios.post(
        "/api/signup",
        { email, name, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const location = router.pathname === "/auth" ? "/" : router.asPath;
      router.push(location);
      queryClient.invalidateQueries(["me"]);
      modals.closeAll();
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
        {...form.getInputProps("name")}
        label='Name'
        placeholder='e.g John doe'
        required
      />
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
      <PasswordInput
        {...form.getInputProps("password_confirm")}
        label='Confirm Password'
        placeholder='Confirm your password'
        required
        mt='sm'
        id='password_confirm'
      />
      <Button loading={isLoading} type='submit' color='green' fullWidth mt='xl'>
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </Paper>
  );
};
