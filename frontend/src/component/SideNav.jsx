/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Text,
  useToast,
  Icon,
  Image,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FcCalculator } from "react-icons/fc";
import { MdOutlinePayment } from "react-icons/md";
import { logout } from "../config/firebase";
import Logo from "../assets/images/absa_logo.png";

const navItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Icon as={RxDashboard} color="inherit" />,
    color: "white",
  },
  {
    title: "Loan Documents",
    path: "loan-documents",
    icon: <Icon as={MdOutlinePayment} color="orange.300" />,
    color: "orange.300",
  },
  {
    title: "Loans",
    path: "loans",
    icon: <FcCalculator />,
    color: "green.400",
  },

  {
    title: "Vendors",
    path: "vendors",
    icon: <FcCalculator />,
    color: "green.400",
  },
];

function SideNav({ isOpen, onClose }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      toast({
        description: "successfully logged-out",
        status: "success",
        duration: 4000,
        variant: "left-accent",
        colorScheme: "teal",
      });
      navigate({ pathname: "/signin" });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 4000,
        variant: "left-accent",
      });
    }
  };

  const [activeRoute, setActiveRoute] = useState(navItems[0].title);

  const handleRouteChange = (tab) => {
    setActiveRoute(tab);
  };

  return (
    <>
      <Flex
        bg="white"
        p={1}
        rounded="lg"
        shadow="md"
        flexDir="column"
        mx={5}
        px={4}
        minH="95vh"
        w="16.5%"
        gap={3}
        position="fixed"
        display={{base: "none", xl: "flex"}}
      >
        <Image src={Logo} boxSize="80px" objectFit="contain" mx="auto" />
        <Divider />
        {navItems.map((navItem, index) => (
          <Flex
            key={index}
            as={Link}
            to={navItem.path}
            onClick={() => handleRouteChange(navItem.title)}
            textTransform="uppercase"
            bg={activeRoute === navItem.title ? "red.700" : "transparent"}
            shadow={activeRoute === navItem.title ? "lg" : "none"}
            color={activeRoute === navItem.title ? navItem.color : "gray.600"}
            fontWeight={activeRoute === navItem.title ? "bold" : "semibold"}
            p={3}
            rounded="lg"
            fontSize="lg"
            gap={4}
            w="full"
          >
            {navItem.icon}
            <Text fontSize="sm">{navItem.title}</Text>
          </Flex>
        ))}
        <Button
          variant="solid"
          bg="red.700"
          transition={"all 1000ms"}
          color="#FDFDFD"
          type="submit"
          isLoading={isLoading}
          _hover={{ bg: "red.500" }}
          mt="auto"
          fontWeight="bold"
          rounded="lg"
          textTransform="uppercase"
          shadow="lg"
        >
          Logout
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex
              bg="white"
              p={1}
              rounded="lg"
              flexDir="column"
              mx={5}
              h="95vh"
              gap={3}
            >
              <Image src={Logo} boxSize="80px" objectFit="contain" mx="auto" />
              <Divider />
              {navItems.map((navItem, index) => (
                <Flex
                  key={index}
                  as={Link}
                  to={navItem.path}
                  onClick={() => handleRouteChange(navItem.title)}
                  textTransform="uppercase"
                  bg={
                    activeRoute === navItem.title ? "gray.200" : "transparent"
                  }
                  shadow={activeRoute === navItem.title ? "lg" : "none"}
                  color={
                    activeRoute === navItem.title ? navItem.color : "gray.600"
                  }
                  fontWeight={
                    activeRoute === navItem.title ? "bold" : "semibold"
                  }
                  p={3}
                  rounded="lg"
                  fontSize="lg"
                  gap={4}
                  w="full"
                >
                  {navItem.icon}
                  <Text fontSize="sm">{navItem.title}</Text>
                </Flex>
              ))}
              <Button
                variant="solid"
                bgGradient="linear(to-l,teal.400,teal.300,teal.200)"
                transition={"all 1000ms"}
                color="#FDFDFD"
                type="submit"
                isLoading={isLoading}
                _hover={{ bg: "teal.400" }}
                mt="auto"
                fontWeight="bold"
                rounded="lg"
                textTransform="uppercase"
                shadow="lg"
              >
                Logout
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideNav;
