import React, { useState, useContext } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Link,
  Divider,
  useDisclosure
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import { AuthContext, AuthContextType } from '../contexts/AuthContext'
import SuccessAlert from './SuccessAlert'
import ErrorAlert from './ErrorAlert'
import SocialLogin from '../components/SocialLogin'

const formSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, { message: 'Digite seu email corretamente, por favor!' }),
    password: z.string().min(1, { message: 'Digite sua senha, por favor!' })
})

const LoginForm: React.FC = () => {
    const { grantAuthentication } = useContext(AuthContext) as AuthContextType;

    const { isOpen: isErrorOpen, onClose: onErrorClose, onOpen: onErrorOpen } = useDisclosure()
    const { isOpen: isSuccessOpen, onClose: onSuccessClose, onOpen: onSuccessOpen } = useDisclosure()

    const [errorMessage, setErrorMessage] = useState('')
    const [allowSeePassword, setAllowSeePassword] = useState(false)
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(formSchema) })
    
    const handleSeePassword = () => {
        setAllowSeePassword(!allowSeePassword)
    }

    const onSubmit = handleSubmit(data => {
        axios.post('http://localhost:3001/session', { 
            email: data.email,
            password: data.password
        })
        .then(response => {
            if(response.data.token) {
                const email = data.email
                const token = response.data.token

                grantAuthentication({ email, token })
            }
        })
        .catch(err => {
            switch(err.response.data.message) {
                case 'User does not exists!':
                    setErrorMessage('O usuário não foi encontrado!')
                    break;
                case 'Incorrect password!':
                    setErrorMessage('A senha está incorreta!')
                    break;
                default:
                    setErrorMessage(err.response.data.message)
                    break;
            }

            onErrorOpen()
        })
    });

    return (
        <>
            <form onSubmit={onSubmit} id="customForm">
                <FormControl isInvalid={errors?.email ? true : false} mb={10} position='relative'>
                    <FormLabel htmlFor='email' fontSize={12} color='#000'>Seu email</FormLabel>
                    <Input
                        id='email'
                        placeholder='example@email.com.br'
                        rounded={12}
                        p={6}
                        borderWidth={3}
                        fontSize={14}
                        color='#000'
                        {...register('email')}
                    />
                    <Box position='absolute' top='2.7em' right={4} color='#aaa'>
                        <AiOutlineMail size='1em' />
                    </Box>
                    <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                        {errors?.email  ? 'Digite seu email corretamente, por favor!' : ''}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={ errors?.password ? true : false } position='relative'>
                    <FormLabel htmlFor='password' fontSize={12} color='#000'>Sua senha</FormLabel>
                    <Input
                        id='password'
                        type={ !allowSeePassword ? 'password' : 'text' }
                        placeholder='Ex1!g*G21k'
                        rounded={12}
                        p={6}
                        borderWidth={3}
                        fontSize={14}
                        color='#000'
                        {...register('password')}
                    />
                    <Box position='absolute' top='2.7em' right={4} color='#aaa' cursor='pointer' onClick={handleSeePassword}>
                        {
                            !allowSeePassword ? <AiOutlineEye size='1em' /> : <AiOutlineEyeInvisible size='1em' />
                        }
                    </Box>
                    <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                        { errors?.password  ? 'Digite sua senha, por favor!' : '' }
                    </FormErrorMessage>
                </FormControl>
                
                <Divider mt={10} mb={6} />

                <SocialLogin />

                <Button display='block' w='300px' mx='auto' bg='mainBlue' shadow='md' fontSize={14} color='#fff' rounded='xl' mt={10} position='relative' isLoading={isSubmitting} _hover={{ bg: 'mainBlue', color: '#fff', opacity: '.8' }} type='submit'>
                    Login
                    <Box h={4} w={4} position='absolute' insetY={0} my='auto' right={24}>
                        <BsArrowRight size='1.2em' />
                    </Box>
                </Button>

                <Box w='100%' p={2} textAlign='center' marginTop={2}>
                    <Text fontSize={12} color='#000'>Não possui uma conta? <Link as={RouteLink} to='/register' color='mainBlue'>Se registre agora mesmo!</Link></Text>
                </Box>
            </form>
            
            <SuccessAlert title='Uhuul' message='Login realizado!' buttonMessage='Ok' isOpen={isSuccessOpen} onClose={onSuccessClose} onOpen={onSuccessOpen} />
            <ErrorAlert title='Oops...' message={errorMessage} buttonMessage='Ok' isOpen={isErrorOpen} onClose={onErrorClose} onOpen={onErrorOpen} />
        </>
    )
}

export default LoginForm