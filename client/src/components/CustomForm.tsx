import React from 'react'
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, { message: 'Digite seu email corretamente, por favor!' }),
    password: z.string().min(1, { message: 'Digite sua senha, por favor!' })
})

const CustomForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema)
    });
    
    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <form onSubmit={onSubmit} id="customForm">
            <FormControl isInvalid={errors?.email ? true : false} mb={6}>
                <FormLabel htmlFor='email' fontSize={13}>Seu email</FormLabel>
                <Input
                    id='email'
                    placeholder='Seu email'
                    rounded={16}
                    p={6}
                    borderWidth={3}
                    {...register('email')}
                />
                <FormErrorMessage fontSize={13}>
                    {errors?.email  ? 'Digite seu email corretamente, por favor!' : ''}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.password ? true : false}>
                <FormLabel htmlFor='password' fontSize={13}>Sua senha</FormLabel>
                <Input
                    id='password'
                    placeholder='Sua senha'
                    rounded={16}
                    p={6}
                    borderWidth={3}
                    {...register('password')}
                />
                <FormErrorMessage fontSize={13}>
                    {errors?.password  ? 'Digite sua senha, por favor!' : ''}
                </FormErrorMessage>
            </FormControl>
            <Button display='block' w='300px' mx='auto' bg='mainBlue' shadow='md' color='#fff' mt={10} isLoading={isSubmitting} type='submit' _hover={{ bg: 'mainBlue', color: '#fff' }}>
                Enviar
            </Button>
        </form>
    )
}

export default CustomForm