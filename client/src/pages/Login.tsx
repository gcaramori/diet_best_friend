import React from 'react'
import { Flex, Image, Heading } from '@chakra-ui/react'
import CustomForm from '../components/CustomForm'

const Login: React.FC = () => {
    return (
        <Flex justifyContent='center' alignItems='center' w='100%' h='100%' bg='mainBlue'>
            <Flex direction="column" alignItems='center' gap={10} w={{ base: '95%', md: '60%' }} maxW={{ md: '500px' }} h={{ base: '80%', md: '85%' }} bg='mainWhite' rounded={50} boxShadow='lg' py={10} px={20}>
                <Image src="logo.png" alt="logo_image" w='250px' h='250px' objectFit='contain'/>
                
                <Flex direction='column' justifyContent='center' alignItems='center' w='100%'>
                    <Heading as='h2' fontSize={32} mb={10}>Bem vindo de volta!</Heading>
                    
                    <CustomForm />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Login