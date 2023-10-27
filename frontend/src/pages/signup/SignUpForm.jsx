/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Select,
  Heading,
  Center,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { db, signUp } from "../../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function SignUpForm() {
  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "",
    passwordConfirmation: "",
    telephone: "",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    countryCode,
    telephone,
  } = registerUser;

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const countryCodes = [
    { label: "+233", value: "233" },
    { label: "+44", value: "44" },
    { label: "+1", value: "1" },
    { label: "+234", value: "234" },
    // You Can add more country codes as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({ ...prev, [name]: value }));
  };

  const toast = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      // Passwords don't match, show an error message or take appropriate action
      toast({
        description: "Passwords do not match",
        duration: 3000,
        status: "error",
        colorScheme: "red",
      });
    } else {
      const fullPhoneNumber = `+${countryCode} ${telephone}`;
      setIsLoading(true);
      try {
        const res = await signUp(email, password);
        setDoc(doc(db, "users", res.user.uid), {
          ...registerUser,
          timeStamp: serverTimestamp(),
        });
        setRegisterUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          countryCode: "",
          telephone: "",
        });
        toast({
          description: "Successfully Registered",
          duration: 3000,
          status: "success",
          colorScheme: "green",
        });
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
      navigate({ pathname: "/" });
    }
  };

  return (
    <Box className="backgroundStyle">
      <Box p={4} className="formContainerStyle" w={{ base: "full", lg: "50%" }}>
        <form onSubmit={handleSubmit} className="formStyle">
          <Center>
            <Heading
              size="lg"
              mb={5}
              bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
              bgClip="text"
            >
              Credit Care
            </Heading>
            {error && (
              <Text color="red.400" fontWeight="semibold">
                An Error has Occured
              </Text>
            )}
          </Center>
          <Stack spacing={8}>
            <HStack>
              <FormControl id="fname">
                <FormLabel className="sr-only"> First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  bg="white"
                />
              </FormControl>
              <FormControl id="lname" isRequired>
                <FormLabel className="sr-only">Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  bg="white"
                />
              </FormControl>
            </HStack>

            <FormControl id="email" isRequired>
              <FormLabel className="sr-only">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                bg="white"
              />
            </FormControl>
            <HStack>
              <FormControl id="countryCode" isRequired>
                <FormLabel className="sr-only" w="80px" ml={0}>
                  Country Code
                </FormLabel>
                <Select
                  name="countryCode"
                  onChange={handleChange}
                  placeholder="Country Code"
                  bg="white"
                >
                  {countryCodes.map((code) => (
                    <option key={code.value} value={code.value}>
                      {code.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="telephone" isRequired>
                <FormLabel className="sr-only">Telephone</FormLabel>
                <Input
                  type="tel"
                  name="telephone"
                  onChange={handleChange}
                  placeholder="Telephone number"
                  bg="white"
                />
              </FormControl>
            </HStack>

            <FormControl id="password" isRequired>
              <FormLabel className="sr-only">Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                bg="white"
              />
            </FormControl>
            <FormControl id="passwordConfirmation" isRequired>
              <FormLabel className="sr-only">Confirm Password</FormLabel>
              <Input
                type="password"
                name="passwordConfirmation"
                onChange={handleChange}
                placeholder="Confirm your password"
                bg="white"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              disabled={!isCheckboxChecked}
              isLoading={isLoading}
              bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
              _hover={{ bg: "teal.400" }}
              color="#FDFDFD"
              transition="all 500ms"
              w="75%"
              mx="auto"
            >
              Submit
            </Button>
            <Text fontSize="sm" px={2}>
              Already a member?
              <Link to="/signin" className="signup_link">
                Sign in here
              </Link>
            </Text>
            <Checkbox
              colorScheme="green"
              defaultChecked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            >
              <Text fontSize="xs">
                By tapping submit, you agree to CreditCare Privacy Policy and
                Terms & Conditions
              </Text>
            </Checkbox>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignUpForm;
