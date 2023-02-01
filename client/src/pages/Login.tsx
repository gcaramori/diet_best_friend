import React from 'react';
import { Box, Flex, Image, Container, Heading, Text } from '@chakra-ui/react';

const Login: React.FC = () => {
    return (
        <Flex justifyContent='center' alignItems='center' w='100%' h='100%' bg='mainBlue'>
            <Flex direction="column" alignItems='center' w={{ base: '95%', md: '60%' }} maxW={{ md: '600px' }} h={{ base: '80%', md: '85%' }} bg='mainWhite' rounded='lg' boxShadow='lg'>
                <Image src="logo.png" alt="logo_image" w='250px' h='250px' objectFit='contain' />
            </Flex>
        </Flex>
    )
}

export default Login