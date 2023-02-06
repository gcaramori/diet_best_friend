import React from 'react';
import { Flex, Link, Heading } from '@chakra-ui/react'
import LogoutButton from '../components/LogoutButton';

const Home: React.FC = () => {
    return (
        <Flex direction='column' justifyContent='center' alignItems='center' p={4}>
            <Heading as='h1' mb={10}>Bem-vindo Guilherme</Heading>
            <LogoutButton />
        </Flex>
    )
}

export default Home