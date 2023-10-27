import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast, // Import useToast
} from "@chakra-ui/react";

const Vendors = () => {
  return (
    <Box p={5} bg="#F4F4F4" m={4}>
    <Heading
      textTransform="uppercase"
      fontSize="2xl"
      bgGradient="linear(to-r, #EA0036, #F45022)"
      bgClip="text"
      mt={6}
      textAlign="center"
    >
      Track your vendors
    </Heading>
    
  </Box>
  )
}

export default Vendors
