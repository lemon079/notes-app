import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const toast = useToast({
    position: "top",
    duration: 2000,
    isClosable: true,
  });

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`http://localhost:3000/auth/signup`, {
        username,
        email,
        password,
      });

      toast({
        title: "User Created Successfully",
        description: `Username is ${data.createdUser.username}`,
        status: "success",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error Creating User",
        description: error.response?.data?.msg || "Failed To Create User",
        status: "error",
      });
    }
  }


  useGSAP(() => {
    gsap.from(".animate--signup", {
      translateX: "100%",
      duration: 0.6,
      ease: "elastic.out",
    });
  }, []);

  return (
    <Box
      className="animate--signup"
      mx="auto"
      mt="10"
      w={"80%"}
      borderWidth="1px"
      bgColor="#f5f5f5"
      border="1px solid gray"
      borderRadius={"25px"}
      p={4}
      boxShadow="lg"
    >
      <form onSubmit={handleSignup}>
        <Text
          fontSize="2xl"
          mb="4"
          textAlign={"center"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          Signup
        </Text>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant={"flushed"}
            placeholder="Username"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant={"flushed"}
            placeholder="Email"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant={"flushed"}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem" justifyContent={"right"}>
              <Button
                size="sm"
                bg={"transparent"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button colorScheme="teal" mt="4" type="submit" w={"full"}>
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
