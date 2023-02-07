import React, { useState, useEffect, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { AuthContext, AuthContextType } from '../contexts/AuthContext'
import { FcGoogle } from 'react-icons/fc'
import ErrorAlert from './ErrorAlert'

const SocialLogin: React.FC = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { grantAuthentication } = useContext(AuthContext) as AuthContextType;

    const [userData, setUserData] = useState<TokenResponse>()
    const [errorMessage, setErrorMessage] = useState<string>('')
    
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUserData(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    })

    useEffect(() => {
        if(userData?.access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${userData?.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((googleResponse) => {
                if(googleResponse.data.email && googleResponse.data.verified_email) {
                    axios.post('http://localhost:3001/session/google', {
                        email: googleResponse.data.email,
                        verified_email: googleResponse.data.verified_email
                    })
                    .then((tokenResponse) => {
                        if(tokenResponse.data.user.email && tokenResponse.data.token) {
                            const email = tokenResponse.data.user.email
                            const token = tokenResponse.data.token

                            grantAuthentication({ email, token })
                        }
                    })
                    .catch(err => {
                        if(err.response.data.message === 'User does not exists!') 
                            setErrorMessage('Usuário não encontrado em nossa base de dados! Por favor, registre-se!')
                        else 
                            setErrorMessage(err.response.data.message)
                            
                        onOpen()
                    })
                }
            })
            .catch((err) => console.log(err))
        }
    }, [userData])

    return (
        <>
            <Flex justifyContent='center' alignItems='center' w='100%' paddingBottom={6}>
                <Button onClick={ () => login() } display='flex' justifyContent='center' alignItems='center' w='90%' h={8} bg='#eee' shadow='md' rounded='full'>
                    <FcGoogle size='1.2em' />
                    <Text fontSize={12} color='#000' fontWeight='600' ml={4}>Fazer login com o Google</Text>
                </Button>
            </Flex>

            <ErrorAlert title='Oops...' message={errorMessage} buttonMessage='Ok' isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </>
    )
}

export default SocialLogin