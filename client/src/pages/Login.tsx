import React from 'react'
import { Flex, Image, Heading, Divider, Button } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'
import CustomForm from '../components/CustomForm'
import { FcGoogle } from 'react-icons/fc'

const Login: React.FC = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <Flex justifyContent='center' alignItems='center' w='100%' h='100%' bg='mainBlue'>
            <Flex direction="column" alignItems='center' gap={10} w={{ base: '95%', md: '60%' }} maxW={{ md: '500px' }} h={{ base: '80%', md: '85%' }} bg='mainWhite' rounded={50} boxShadow='lg' py={10} px={20}>
                <Image src="logo.png" alt="logo_image" w='220px' h='220px' objectFit='contain'/>
                
                <Flex direction='column' justifyContent='center' alignItems='center' w='100%'>
                    <Heading as='h2' fontSize={32} mb={10}>Bem vindo de volta!</Heading>
                    
                    <CustomForm />

                    <Divider my={6} />

                    <Button w={12} h={12} rounded='lg' shadow='lg' fontSize={16} onClick={() => login()}>
                        <FcGoogle />
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Login