import { Flex, Spinner } from "@chakra-ui/react"

function LoadingIndicator() {
  return (
    <>
    <Flex
        justifyContent="center"
        align="center"
        bgColor="#3f3f3f55"
        position="absolute"
        w="full"
        h="100vh"
        top={0}
      >
        <Spinner size="xl" thickness="4px" emptyColor="teal.300" color="gray.200"/>
      </Flex>
    </>
  )
}

export default LoadingIndicator