import React from 'react'
import { Flex, Text, Box, List, ListItem, Image } from '@chakra-ui/react'

const Sidebar: React.FC = () => {
    return (
        <Flex direction='column' justifyItems='center' alignItems='center' h='100%' w={60} bg='mainBlue' shadow='lg' py={8}>
            <Image src="logo.png" alt="logo_image" w='80px' h='80px' objectFit='contain' mb={10} />

            <List listStyleType='none' w='100%' textAlign='center'>
                <ListItem fontSize={22} fontWeight='bold' cursor='pointer' p={2} mb={6} transition='all 200ms ease-in-out' _hover={{ 'opacity': '.7', 'background': 'mainWhite' }}>
                    Diário
                </ListItem>
                <ListItem>
                    Alimentos
                </ListItem>
            </List>
        </Flex>
    )
}

export default Sidebar