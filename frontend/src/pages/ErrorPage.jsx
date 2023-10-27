import { Center, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <Center minH="100vh" display="flex" flexDir="column">
        <Text fontWeight="semibold" fontSize="2xl">
          404 | Page Not Found
        </Text>

        <Link to="/" color="green">
          Go back to Home
        </Link>
      </Center>
    </>
  );
}

export default ErrorPage;
