import React, { useContext } from 'react'
import { Text, Button } from '@chakra-ui/react'
import { HiLogout } from 'react-icons/hi'
import { getCookie, deleteCookie } from '../lib/utils'
import { redirect } from "react-router-dom"
import { AuthContext, AuthContextType } from '../contexts/AuthContext'

const LogoutButton: React.FC = () => {
    const { resetAuthentication } = useContext(AuthContext) as AuthContextType;

    const logout = () => {
        if(getCookie('user_auth') !== false) {
            deleteCookie('user_auth')

            resetAuthentication()

            redirect('/')
        }
    }

    return (
        <Button bg='transparent' color='#000' border='none' _hover={{ bg: 'transparent' }} onClick={logout}>
            <HiLogout size='1.5em' />
            <Text fontSize={14} color='#000' ml={2}>Sair</Text>
        </Button>
    )
}

export default LogoutButton