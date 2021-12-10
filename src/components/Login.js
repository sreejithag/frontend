import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login, loggedIn } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/data");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") return false;

    const success = await login(username, password);

    if (success) {
      navigate("/data");
    } else {
      alert("username or password incorrect");
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing="8">
        <Box boxShadow="lg" p="8">
          <form onSubmit={authenticate}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  title="emailInputBox"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  title="passwordInputBox"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  title="loginBtn"
                >
                  Sign in
                </Button>
              </Stack>
              <Button
                color="currentColor"
                variant="outline"
                title="gLoginBtn"
                onClick={() =>
                  (window.location.href = "http://localhost:4000/login/google")
                }
              >
                Login with Google
              </Button>

              <Stack>
                <Text align={"center"}>
                  New User?{" "}
                  <Link to="/signup" style={{ color: "#4299E1" }}>
                    Signup
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
