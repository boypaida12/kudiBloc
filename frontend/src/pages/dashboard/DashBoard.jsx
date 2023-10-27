/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Divider,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import BarChart from "../../component/BarChart";
import { TbCurrencyCent } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateAllLoans,
  calculateAllPayments,
  updatePaymentPercentage
} from "../../slices/functionSlice";
import LineChart from "../../component/LineChart";
import YearlyBarChart from "../../component/YearlyBarChart";

const DashBoard = () => {
  const state = useSelector((state) => state.loanReducer);
  const dispatch = useDispatch();
  //console.log(state);

  useEffect(() => {
    dispatch(calculateAllLoans(), calculateAllPayments(),updatePaymentPercentage());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Grid
          my={10}
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={5}
        >
          <GridItem bg="white" rounded="lg" p={3} shadow="md" h="8.25rem">
            <Flex align="center">
              <Icon
                as={TbCurrencyCent}
                bg="orange.300"
                color="white"
                p={2}
                fontSize="5xl"
                position="relative"
                top={-6}
                rounded="lg"
                shadow="lg"
              />
              <Box ms="auto">
                <Text fontSize="xs" color="gray.500">
                  Total Payments
                </Text>
                <Text fontSize="sm" fontWeight="bold" textAlign="end">
                  GHS {state.allPayments}.00
                </Text>
              </Box>
            </Flex>
            <Divider />
            <Text fontSize="sm" color="gray.500" my={2}>
              <Text as="span" color="green.400" fontWeight="bold">
                0%{" "}
              </Text>
              of total loans paid so far
            </Text>
          </GridItem>
          <GridItem bg="white" rounded="lg" p={3} shadow="md">
            <Flex align="center">
              <Icon
                as={GiReceiveMoney}
                bg="green.300"
                color="white"
                p={2}
                fontSize="5xl"
                position="relative"
                top={-6}
                rounded="lg"
                shadow="lg"
              />
              <Box ms="auto">
                <Text fontSize="xs" color="gray.500">
                  Total Loans Disbursed
                </Text>
                <Text fontSize="sm" fontWeight="bold" textAlign="end">
                  GHS {state.allLoans}.00
                </Text>
              </Box>
            </Flex>
            <Divider />
            <Text fontSize="sm" color="gray.500" my={2}>
              <Text as="span" color="red.400" fontWeight="bold">
                0%{state.updatePaymentPercentage}
              </Text>
              from last week
            </Text>
          </GridItem>
          <GridItem bg="white" rounded="lg" p={3} shadow="md">
            <Flex align="center">
              <Icon
                as={GiMoneyStack}
                bg="red.300"
                color="white"
                p={2}
                fontSize="5xl"
                position="relative"
                top={-6}
                rounded="lg"
                shadow="lg"
              />
              <Box ms="auto">
                <Text fontSize="xs" color="gray.500">
                  Total Outstanding Debt
                </Text>
                <Text fontSize="sm" fontWeight="bold" textAlign="end">
                  GHS 0.00
                 
                </Text>
              </Box>
            </Flex>
            <Divider />
            <Text fontSize="sm" color="gray.500" my={2}>
              <Text as="span" color="green.400" fontWeight="bold">
                0%{" "}
              </Text>
              of total loans left
            </Text>
          </GridItem>
          <GridItem bg="white" rounded="lg" p={3} shadow="md">
            <Flex align="center">
              <Icon
                as={HiOutlineBriefcase}
                bg="blue.300"
                color="white"
                p={2}
                fontSize="5xl"
                position="relative"
                top={-6}
                rounded="lg"
                shadow="lg"
              />
              <Box ms="auto">
                <Text fontSize="xs" color="gray.500">
                  Total Portfolios
                </Text>
                <Text fontSize="sm" fontWeight="bold" textAlign="end">
                  4
                </Text>
              </Box>
            </Flex>
            <Divider />
            <Text fontSize="sm" color="gray.500" my={2}>
              Loan Portfolios
            </Text>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(auto-fit, minmax(12rem, 1fr))" gap={5}>
          <GridItem bg="white" p={3} rounded="lg" shadow="md">
            <BarChart bgGradient="linear(to-b,blue.500,blue.400,blue.300)" />
            <Text fontSize="sm" color="gray.500" fontWeight="bold">
              Weekly Payments
            </Text>
            <Divider my={2} />
            <Text fontSize="sm" color="gray.500">
              Lorem ipsum dolor sit amet.
            </Text>
          </GridItem>
          <GridItem bg="white" p={3} rounded="lg" shadow="md">
            <LineChart bgGradient="linear(to-b,green.400,green.300,green.200)" />
            <Text fontSize="sm" color="gray.500" fontWeight="bold">
              Monthly Payments
            </Text>
            <Divider my={2} />
            <Text fontSize="sm" color="gray.500">
              Repudiandae, illum amet.
            </Text>
          </GridItem>
          <GridItem bg="white" p={3} rounded="lg" shadow="md">
            <YearlyBarChart bgGradient="linear(to-b,red.500,red.400,red.300)" />
            <Text fontSize="sm" color="gray.500" fontWeight="bold">
              Yearly Payments
            </Text>
            <Divider my={2} />
            <Text fontSize="sm" color="gray.500">
              Consequuntur at omnis sit sunt.
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default DashBoard;
