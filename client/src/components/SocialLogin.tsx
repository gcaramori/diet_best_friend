import React, { useState, useEffect, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Flex, Button, Text } from '@chakra-ui/react'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { AuthContext, AuthContextType } from '../contexts/AuthContext'
import { FcGoogle } from 'react-icons/fc'

const SocialLogin: React.FC = () => {
    const { grantAuthentication } = useContext(AuthContext) as AuthContextType;

    const [userData, setUserData] = useState<TokenResponse>()
    
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUserData(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if(userData?.access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${userData?.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                if(res.data.verified_email) {
                    const email = res.data.email
                    const token = userData.access_token

                    grantAuthentication({ email, token })
                }
            })
            .catch((err) => console.log(err))
        }
    }, [userData])

    return (
        <Flex justifyContent='center' alignItems='center' w='100%' paddingBottom={6}>
            <Button onClick={ () => login() } display='flex' justifyContent='center' alignItems='center' w='90%' h={8} bg='#eee' shadow='md' rounded='full'>
                <FcGoogle size='1.2em' />
                <Text fontSize={12} color='#000' fontWeight='600' ml={4}>Fazer login com o Google</Text>
            </Button>
        </Flex>
    )
}

export default SocialLogin