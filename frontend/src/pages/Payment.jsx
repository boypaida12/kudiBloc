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
          bgGradient="linear(to-r,cyan.700,cyan.500,teal.200)"
          bgClip="text"
        >
          Payment Data
        </Heading>
      </Flex>
      <Box my={5}>
        {paymentDataIsEmpty ? (
          <>
            <Flex
              justifyContent="space-between"
              py={2}
              bg="#FDFDFD"
              rounded="lg"
              shadow="lg"
              overflowX="auto"
              whiteSpace="nowrap"
            >
              {tableHeadings.map((tableHeading) => (
                <Text
                  key={tableHeading}
                  mx="auto"
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="bold"
                  textTransform="uppercase"
                  px={{ base: 4, lg: 0 }}
                >
                  {tableHeading}
                </Text>
              ))}
            </Flex>
            <Flex
              h="50vh"
              flexDir="column"
              justify="center"
              align="center"
              gap={5}
            >
              <Icon
                as={TbCurrencyCent}
                fontSize="5xl"
                color="cyan.500"
                bg="#FDFDFD"
                rounded="full"
                shadow="lg"
                p={1}
              />
              <Text
                textTransform="uppercase"
                mt={4}
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
                textAlign="center"
              >
                You Have No Loans Yet. Create a Loan portfolio &nbsp;
                <ChakraLink
                  as={ReactRouterLink}
                  to="/loans"
                  bgGradient="linear(to-r,cyan.700,cyan.500,teal.200)"
                  bgClip="text"
                >
                  Here
                </ChakraLink>
                &nbsp; to View Payment Data
              </Text>
            </Flex>
          </>
        ) : (
          <TableContainer bg="#FDFDFD" rounded="lg" shadow="lg">
            <Table>
              <Thead>
                <Tr>
                  {tableHeadings.map((tableHeading) => (
                    <>
                      <Th textAlign="center">{tableHeading}</Th>
                    </>
                  ))}
                </Tr>
              </Thead>
              <Tbody fontSize="xs">
                {state.map((tableData, i) => (
                  <>
                    <Tr color="gray.600" key={tableData.i}>
                      <Td textAlign="center">{tableData.id}</Td>
                      <Td textAlign="center">{tableData.endDate}</Td>
                      <Td textAlign="center" textTransform="uppercase">
                        {tableData.name}
                      </Td>
                      <Td textAlign="center">
                        ¢{parseFloat(tableData.loanAmount).toFixed(2)}
                      </Td>
                      <Td textAlign="center">
                        ¢{parseFloat(tableData.totalLoan).toFixed(2)}
                      </Td>
                      <Td>
                        <Text
                          bg={
                            tableData.status === "In Progress"
                              ? "yellow.300"
                              : tableData.status === "Paid"
                              ? "green.300"
                              : "red.400"
                          }
                          textAlign="center"
                          fontSize="2xs"
                          px={2}
                          rounded="lg"
                          shadow="lg"
                          textTransform="uppercase"
                          fontWeight="semibold"
                        >
                          {tableData.status}
                        </Text>
                      </Td>
                      <Td textAlign="center">
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<PiDotsThreeVerticalBold />}
                            variant="ghost"
                          />
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                setModalOpen((prev) =>
                                  prev.map((_, idx) =>
                                    idx === i ? !prev[idx] : prev[idx]
                                  )
                                )
                              }
                            >
                              <Flex align="center" gap={2}>
                                <Icon as={AiOutlineEye} fontSize="md" />
                                View Application
                              </Flex>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                              <Flex align="center" gap={2}>
                                <Icon as={AiOutlinePrinter} fontSize="md" />
                                Print
                              </Flex>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                    <Modal
                      isOpen={modalOpen[i]}
                      onClose={() =>
                        setModalOpen((prev) =>
                          prev.map((_, idx) => (idx === i ? false : prev[idx]))
                        )
                      }
                    >
                      <ModalOverlay />
                      <ModalContent textAlign="center">
                        <ModalHeader>{tableData.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Flex
                            flexDir="column"
                            align="center"
                            color="gray.400"
                            fontWeight="bold"
                          >
                            <CircularProgressBar
                              colorCircle="#edf2f7"
                              linearGradient={[
                                "#0987a0",
                                "#00b5d8",
                                "#81e6d9",
                                "#81e6d9",
                              ]}
                              cut={30}
                              round
                              percent={tableData.loanPercentagePaid} //initial loan percentage of 0 retrieve from redux state here
                              rotation={144}
                            >
                              <Text
                                fontSize="xs"
                                position="absolute"
                                top="33.3%"
                                left="38.75%"
                              >
                                of Total Loan Paid
                              </Text>
                            </CircularProgressBar>
                            <Box
                              p={4}
                              bg="gray.100"
                              rounded="xl"
                              w="80%"
                              shadow="lg"
                            >
                              <Text
                                fontSize={"sm"}
                                textTransform="capitalize"
                                textAlign="start"
                              >
                                Estimated {tableData.paymentFrequency} Payment
                              </Text>
                              <Flex
                                gap={5}
                                align="center"
                                fontSize="lg"
                                lineHeight={8}
                              >
                                <Text
                                  bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
                                  bgClip="text"
                                >
                                  {tableData.paymentEstimate}
                                </Text>
                                <Text ms="auto">GHS</Text>
                              </Flex>
                              <Divider my={1} />
                              <Text fontSize={"sm"} textAlign="start">
                                Total Loan
                              </Text>
                              <Flex
                                gap={5}
                                align="center"
                                fontSize="lg"
                                lineHeight={8}
                              >
                                <Text
                                  bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
                                  bgClip="text"
                                >
                                  {parseFloat(tableData.totalLoan).toFixed(2)}
                                </Text>
                                <Text ms="auto">GHS</Text>
                              </Flex>
                              <Divider my={1} />
                              <Text fontSize={"sm"} textAlign="start">
                                Principal Loan
                              </Text>
                              <Flex
                                gap={5}
                                align="center"
                                fontSize="lg"
                                lineHeight={8}
                              >
                                <Text
                                  bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
                                  bgClip="text"
                                >
                                  {parseFloat(tableData.loanAmount).toFixed(2)}
                                </Text>
                                <Text ms="auto">GHS</Text>
                              </Flex>
                              <Divider my={1} />
                              <Text fontSize={"sm"} textAlign="start">
                                Interest Rate Per Year
                              </Text>
                              <Flex
                                gap={5}
                                align="center"
                                fontSize="lg"
                                lineHeight={8}
                              >
                                <Text
                                  bgGradient="linear(to-r,cyan.700,cyan.500,teal.300)"
                                  bgClip="text"
                                >
                                  {tableData.loanRate}
                                </Text>
                                <Text ms="auto">%</Text>
                              </Flex>
                            </Box>
                            <Flex
                              my={5}
                              flexDir="column"
                              align="center"
                              gap={2}
                            >
                              <Text fontSize="2xs" color="gray.500">
                                Click on the button below to pay{" "}
                                {tableData.paymentFrequency} amount
                              </Text>
                              <Button
                                w="80%"
                                bg="teal.400"
                                _hover="teal.400"
                                color="#FDFDFD"
                                fontWeight="bold"
                                shadow="lg"
                                onClick={() => handleOpenPaymentFormModal(i)}
                              >
                                Proceed to Pay
                              </Button>
                            </Flex>
                          </Flex>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <Modal
                      isOpen={paymentFormModalOpen[i]}
                      onClose={() => handleClosePaymentFormModal(i)}
                      size="xl"
                      isCentered
                    >
                      <ModalOverlay
                        bg="blackAlpha.300"
                        backdropFilter="blur(5px) hue-rotate(90deg)"
                      />
                      <ModalContent textAlign="center">
                        <ModalHeader>{tableData.name} Payment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Flex
                            as="form"
                            maxW={96}
                            mx="auto"
                            fontWeight="bold"
                            flexDir="column"
                            gap={5}
                          >
                            <Text textAlign="start">
                              Total Amount: {tableData.paymentEstimate}
                            </Text>
                            <FormControl>
                              <FormLabel>Full Name</FormLabel>
                              <Input
                                type="text"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Email address</FormLabel>
                              <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FormControl>
                          </Flex>
                          <Flex
                            w="fit-content" // Adjust the width as needed
                            mx="auto"
                            my={5}
                            bgGradient="linear(to-l,teal.400,teal.300,teal.200)"
                            _hover={{ bg: "teal.400" }}
                            transition="all 1000ms"
                            color="#FDFDFD"
                            fontWeight="bold"
                            shadow="lg"
                            px={5}
                            py={2}
                            rounded="lg"
                          >
                            <PaystackButton
                              {...componentProps}
                              amount={
                                parseFloat(tableData.paymentEstimate) * 100
                              }
                              onSuccess={() => {
                                const budgetId = tableData.id;
                                dispatch(updatePaymentPercentage(budgetId));
                                dispatch(
                                  updateAllpayments(
                                    parseFloat(tableData.paymentEstimate)  
                                  )
                                );
                              }}
                            />
                          </Flex>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default Payment;
