import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
function EditProfile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //   const [email, setEmail] = useState("");
  const save = async () => {
    if (firstName !== "" || lastName !== "") {
      const url = `${process.env.REACT_APP_API_BASE_URL}/updateUser`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
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
            alert("Profile edited");
            navigate("/data");
          } else {
            alert("Failed try again");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
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
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={save}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default EditProfile;
