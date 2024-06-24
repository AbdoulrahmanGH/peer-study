"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isResetOpen, setResetOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleResetPassword = () => {
    if (!email || !newPassword) {
      setError("Fill all fields!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email is invalid");
      return;
    }
    if (newPassword.length < 5) {
      setError("New password is too short");
      return;
    }

    setError("");
    setResetOpen(true);
  };

  const handleConfirmReset = () => {
    setResetOpen(false);
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    onClose();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to Your Peer Study account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to continue to access to all the features{" "}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"} onClick={onOpen}>
                  Forgot password?
                </Text>
              </Stack>
              <Stack pt={1}>
                <Text align={"center"}>
                  New user? Create an account!{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => {
                      navigate("/SignUp");
                    }}
                  >
                    SignUp
                  </Link>
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="reset-email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="new-password">
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isResetOpen} onClose={() => setResetOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to reset your password?</ModalBody>
          <ModalFooter>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleConfirmReset}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSuccessOpen} onClose={handleSuccessClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Password Reset Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Your password has been successfully reset!
            {/* Add a fun animation here */}
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSuccessClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SignIn;
