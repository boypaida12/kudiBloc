/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { TbCurrencyCent } from "react-icons/tb";
import { AiOutlineEye, AiOutlinePrinter } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import { PaystackButton } from "react-paystack";
import {
  updatePaymentPercentage,
  updateAllpayments,
} from "../slices/functionSlice";

const Payment = () => {
  const state = useSelector((state) => state.loanReducer.budget);
  const paymentDataIsEmpty = state.length === 0;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalOpen, setModalOpen] = useState(Array(state.length).fill(false));

  const [paymentFormModalOpen, setPaymentFormModalOpen] = useState(
    Array(state.length).fill(false)
  );

  const tableHeadings = [
    "Loan ID",
    "Due Date",
    "Category",
    "Principal Amount",
    "Loan Amount",
    "Status",
    "Action",
  ];

  // Function to handle opening the payment form modal
  const handleOpenPaymentFormModal = (index) => {
    const updatedPaymentFormModalOpen = [...paymentFormModalOpen];
    updatedPaymentFormModalOpen[index] = true;
    setPaymentFormModalOpen(updatedPaymentFormModalOpen);
  };

  // Function to handle closing the payment form modal
  const handleClosePaymentFormModal = (index) => {
    const updatedPaymentFormModalOpen = [...paymentFormModalOpen];
    updatedPaymentFormModalOpen[index] = false;
    setPaymentFormModalOpen(updatedPaymentFormModalOpen);
  };

  const publicKey = "pk_test_81a7c512f5cd94cff72aa9d7ea21732bc14c07b3";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();

  const componentProps = {
    email,
    currency: "GHS",
    metadata: {
      name,
    },
    publicKey,
    text: "Pay Now",
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <>
      <Flex flexDir="column" mt="6" align="center">
        <Heading
          textTransform="uppercase"
          fontSize="2xl"
          m="0 auto"
          bgGradient="linear(to-r,red.700,red.500,red.200)"
          bgClip="text"
        >
          Upload Required Loan Documents
        </Heading>
      </Flex>
      <Box my={5}>
        
      </Box>
    </>
  );
};

export default Payment;
