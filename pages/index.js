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
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from "yup"


export default function SignIn() {

  const loginInfo = { userName: "Apple", pswd: "hello123" }
  const toast = useToast()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Required"),
      password: yup
        .string()
        .required("Required")
    }),
    onSubmit: (values, actions) => {
      if (values.username === loginInfo.userName && values.password === loginInfo.pswd) {
        toast({
          title: 'Sign In Successful',
          status: 'success',
          position: 'bottom-center',
          duration: 2000,
          isClosable: true,
        })
        
      } else {
        toast({
          title: 'Invalid Username or Password',
          status: 'error',
          position: 'bottom-center',
          duration: 2000,
          isClosable: true,
        })
        actions.resetForm()
      }
    }
  })


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg="main-bg"
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color="white-text">Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg="secondary-bg"
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={errors.username && touched.username}>
              <FormLabel color="white-text">Username</FormLabel>
              <Input
                name="username"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
                autoComplete="off"
                color="white-text"
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password && touched.password}>
              <FormLabel color="white-text">Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                color="white-text"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}