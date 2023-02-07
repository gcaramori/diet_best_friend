import React from 'react';
import { Flex, Link, Heading } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion'

const Home: React.FC = () => {
    return (
        <Flex as={motion.div} initial={{ 'opacity': 0 }} animate={{ 'opacity': 1 }} w='100%' h='100%' direction='column' justifyContent='center' alignItems='flex-start'>
            <Sidebar />
        </Flex>
    )
}

export default Home