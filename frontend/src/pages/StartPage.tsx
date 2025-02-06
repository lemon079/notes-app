import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup')
  };

  const handleLogin = () => {
    navigate('/login')
  };

  return (
    <Box
      textAlign="center"
      p={5}
      bgColor="#f5f5f5"
      borderBottom="1px"
      borderColor="gray.200"
      borderRadius={'lg'}
    >
      <Heading as="h1" size="xl" mb={4}>
        Notes App
      </Heading>
      <HStack spacing={4} justifyContent="center">
        <Button colorScheme="teal" onClick={handleSignup}>
          Signup
        </Button>
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </HStack>
    </Box>
  );
};

export default StartPage;
