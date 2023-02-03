import React from 'react'
import { 
    Flex, 
    Image,
    Heading
} from '@chakra-ui/react'
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {
    return (
        <Flex justifyContent='center' alignItems='center' w='100%' h='100%' bg='mainBlue'>
            <Flex direction="column" justifyContent='center' alignItems='center' gap={10} w={{ base: '95%', md: '60%' }} maxW={{ md: '450px' }} h={{ base: '80%', md: '85%' }} bg='mainWhite' rounded={50} boxShadow='lg' py={10} px={14}>
                <Image src="logo.png" alt="logo_image" w='180px' h='180px' objectFit='contain'/>
                
                <Flex direction='column' justifyContent='center' alignItems='center' w='100%'>
                    <Heading as='h2' color='#000' fontSize={28} mb={10}>Bem vindo de volta!</Heading>
                    
                    <LoginForm />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Login