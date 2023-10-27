/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { signIn } from "../../config/firebase";

function SignInForm() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = login;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(login);
    setIsLoading(true);
    try {
      await signIn(email, password);
      setLogin({
        email: "",
        password: "",
      });
      toast({
        description: "Successfully Logged-in",
        duration: 5000,
        status: "success",
        variant: "left-accent",
        colorScheme: "teal",
      });
    } catch (error) {
      toast({
        title: "User Not Found",
        description: "Please Login with the correct credentials or Click on Sign up to Register",
        duration: 5000,
        status: "error",
        variant: "left-accent",
        colorScheme: "red",
      });
      setError(true);
    }
    setIsLoading(false);
    navigate({ pathname: "/" });
  };

  return (
    <Box className="backgroundStyle">
      <Box p={4} className="formContainerStyle" h="65vh" w={{base: "full", lg: "50%"}}>
        <form onSubmit={handleSubmit} className="formStyle">
          <Center>
            <Heading size="lg" mb={5} bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)" bgClip="text">
              Credit Care
            </Heading>
            {error && (
              <Text color="red.400" fontWeight="semibold">
                An Error has Occurred
              </Text>
            )}
          </Center>
          <Stack spacing={8}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                bg="white"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                bg="white"
              />
            </FormControl>
            <Button
              type="submit"
              bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
              _hover={{ bg: "teal.400" }}
              color="#FDFDFD"
              transition="all 500ms"
              w="75%"
              mx="auto"
              size="lg"
              mb="0"
              isLoading={isLoading}
            >
              Sign In
            </Button>
            <Text fontSize="md">
              Not a member?
              <Link to="/signup" className="signup_link">
                Sign up now
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignInForm;
