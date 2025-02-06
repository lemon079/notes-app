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
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toast = useToast({
    position: "top",
    duration: 2000,
    isClosable: true,
  });

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:3000/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast({
        title: "Logged In Successfully",
        status: "success",
      });
      localStorage.setItem('username', data.user.username);
      navigate("/notes");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error Logging In",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
      });
    }
  };


  useGSAP(() => {
    gsap.from(".animate--login", {
      translateX: "100%",
      duration: 0.7,
      ease: "elastic",
    });
  }, []);

  return (
    <Box
      className="animate--login"
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
      <form onSubmit={handleLogin}>
        <Text
          fontSize="2xl"
          mb="4"
          textAlign={"center"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          Login
        </Text>

        <FormControl isRequired>
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

        <Button colorScheme="blue" mt="4" type="submit" w={"full"}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
