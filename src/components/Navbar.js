import { Flex, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import React from "react";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const logMeOut = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    }
  };
  return (
    <Flex
      as="header"
      position="fixed"
      w="100%"
      bg="white"
      top="0px"
      flexDirection="row-reverse"
    >
      <HStack display="flex" spacing={1}>
        <Button variant="ghost" onClick={() => navigate("/editProfile")}>
          Edit Profile
        </Button>
        <Button variant="ghost" onClick={logMeOut}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}

export default Navbar;
