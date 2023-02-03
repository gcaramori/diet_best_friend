import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'

const formSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, { message: 'Digite seu email corretamente, por favor!' }),
    password: z.string().min(1, { message: 'Digite sua senha, por favor!' })
})

const LoginForm: React.FC = () => {
    const [allowSeePassword, setAllowSeePassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(formSchema) });
    
    const handleSeePassword = () => {
        setAllowSeePassword(!allowSeePassword);
    }

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <form onSubmit={onSubmit} id="customForm">
            <FormControl isInvalid={errors?.email ? true : false} mb={6} position='relative'>
                <FormLabel htmlFor='email' fontSize={12}>Seu email</FormLabel>
                <Input
                    id='email'
                    placeholder='Seu email'
                    rounded={12}
                    p={6}
                    borderWidth={3}
                    fontSize={14}
                    {...register('email')}
                />
                <Box position='absolute' top='2.7em' right={4} color='#aaa'>
                    <AiOutlineMail size='1em' />
                </Box>
                <FormErrorMessage fontSize={13}>
                    {errors?.email  ? 'Digite seu email corretamente, por favor!' : ''}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.password ? true : false} position='relative'>
                <FormLabel htmlFor='password' fontSize={12}>Sua senha</FormLabel>
                <Input
                    id='password'
                    type={ !allowSeePassword ? 'password' : 'text' }
                    placeholder='Sua senha'
                    rounded={12}
                    p={6}
                    borderWidth={3}
                    fontSize={14}
                    {...register('password')}
                />
                <Box position='absolute' top='2.7em' right={4} color='#aaa' cursor='pointer' onClick={handleSeePassword}>
                    {
                        !allowSeePassword ? <AiOutlineEye size='1em' /> : <AiOutlineEyeInvisible size='1em' />
                    }
                </Box>
                <FormErrorMessage fontSize={13}>
                    {errors?.password  ? 'Digite sua senha, por favor!' : ''}
                </FormErrorMessage>
            </FormControl>
            <Button display='block' w='300px' mx='auto' bg='mainBlue' shadow='md' fontSize={14} color='#fff' mt={10} position='relative' isLoading={isSubmitting} _hover={{ bg: 'mainBlue', color: '#fff' }} type='submit'>
                Login
                <Box h={4} w={4} position='absolute' insetY={0} my='auto' right={24}>
                    <BsArrowRight size='1.2em' />
                </Box>
            </Button>
        </form>
    )
}

export default LoginForm