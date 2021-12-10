import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    if (
      firstName !== "" ||
      lastName !== "" ||
      email !== "" ||
      password !== ""
    ) {
      const url = `${process.env.REACT_APP_API_BASE_URL}/signup`;
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (response.status === 200) {
          const data = await response.json();

          if (data.success) {
            alert("Signup success");
            navigate("/");
          } else {
            alert("Signup failed try again");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={signUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack>
              <Button
                color="currentColor"
                variant="outline"
                onClick={() =>
                  (window.location.href = "http://localhost:4000/login/google")
                }
              >
                Signup with Google
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/" style={{ color: "#4299E1" }}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
