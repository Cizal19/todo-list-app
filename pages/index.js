import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';


export default function SignIn() {

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg="main-bg">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color="white-text">Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg="secondary-bg"
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color="white-text">Email address</FormLabel>
              <Input 
                type="email" 
                autoComplete="off"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="white-text">Password</FormLabel>
              <Input 
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}