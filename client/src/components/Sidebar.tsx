import React from 'react'
import { Flex, Text, Box, List, ListItem, Image } from '@chakra-ui/react'
import { AiFillBook } from 'react-icons/ai'
import { GiShinyApple } from 'react-icons/gi'
import LogoutButton from './LogoutButton'

const Sidebar: React.FC = () => {
    return (
        <Flex direction='column' justifyItems='center' alignItems='center' h='100%' w={60} bg='mainBlue' shadow='lg' py={8}>
            <Image src="logo.png" alt="logo_image" w='80px' h='80px' objectFit='contain' mb={10} />

            <List listStyleType='none' h='100%' w='100%' textAlign='left' px={6} position='relative'>
                <ListItem p={2} mb={2}>
                    <Flex justifyContent='flex-start' alignItems='center' color='#fff' transition='all 200ms ease-in-out' _hover={{ 'opacity': '.7' }}>
                        <AiFillBook size='1.3em' />
                        <Text fontSize={18} fontWeight='bold' cursor='pointer' ml={4}>
                            Diário
                        </Text>
                    </Flex>
                </ListItem>
                <ListItem p={2} mb={2}>
                    <Flex justifyContent='flex-start' alignItems='center' color='#fff' transition='all 200ms ease-in-out' _hover={{ 'opacity': '.7' }}>
                        <GiShinyApple size='1.3em' />
                        <Text fontSize={18} fontWeight='bold' cursor='pointer' ml={4}>
                            Alimentos
                        </Text>
                    </Flex>
                </ListItem>
                <ListItem p={2} mb={2} position='absolute' bottom={2}>
                    <Flex justifyContent='flex-start' alignItems='center' color='#fff' transition='all 200ms ease-in-out' _hover={{ 'opacity': '.7' }}>
                        <LogoutButton color='#fff' fontSize={18} />
                    </Flex>
                </ListItem>
            </List>
        </Flex>
    )
}

export default Sidebar