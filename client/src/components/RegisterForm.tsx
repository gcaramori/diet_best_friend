import React, { useState } from 'react'
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
  Select,
  Text,
  Link,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsArrowRight, BsFillPersonFill } from 'react-icons/bs'
import SuccessAlertWithRedirect from './SuccessAlertWithRedirect'
import ErrorAlert from './ErrorAlert'

const formSchema = z.object({
    name: z.string().min(4, { message: 'Digite seu nome, por favor!' }),
    email: z.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, { message: 'Digite seu email corretamente, por favor!' }),
    password: z.string().min(1, { message: 'Digite sua senha, por favor!' }),
    gender: z.string({
        errorMap: (issue, _ctx) => {
            switch(issue.code) {
              default:
                return { message: 'Escolha seu gênero, por favor!' };
            }
        }
    }),
    birth: z.coerce.date({
        errorMap: (issue, _ctx) => {
            switch(issue.code) {
              default:
                return { message: 'Escolha a data de nascimento, por favor!' };
            }
        }
    }),
    height: z.coerce.number({
        errorMap: (issue, _ctx) => {
            switch(issue.code) {
              default:
                return { message: 'Digite sua altura, por favor!' };
            }
        }
    }).min(100, { message: 'Digite sua altura corretamente, por favor!' }).max(250, { message: 'Digite sua altura corretamente, por favor!' }),
    country: z.string({
        errorMap: (issue, _ctx) => {
            switch(issue.code) {
              default:
                return { message: 'Escolha seu país, por favor!' };
            }
        }
    }).min(5, { message: 'Escolha seu país, por favor!' }),
    city: z.string().min(5, { message: 'Digite a cidade, por favor!' })
})

const RegisterForm: React.FC = () => {
    const { isOpen: isErrorOpen, onClose: onErrorClose, onOpen: onErrorOpen } = useDisclosure()
    const { isOpen: isSuccessOpen, onClose: onSuccessClose, onOpen: onSuccessOpen } = useDisclosure()

    const [gender, setGender] = useState('')
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
        axios.post('http://localhost:3001/users', { 
            name: data.name,
            email: data.email,
            password: data.password,
            birth: data.birth,
            gender: data.gender,
            height: data.height,
            country: data.country,
            city: data.city
        })
        .then(response => {
            onSuccessOpen()
        })
        .catch(err => {
            console.log(err)
            switch(err.response.data.message) {
                case 'Email already in use':
                    setErrorMessage('O email já está sendo usado por outra pessoa!')
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
                <Stack direction='row' align='center' mb={10}>
                    <FormControl isInvalid={errors?.name ? true : false} position='relative'>
                        <FormLabel htmlFor='name' fontSize={12} color='#000'>Seu nome</FormLabel>
                        <Input
                            id='name'
                            placeholder='Guilherme Henrique'
                            rounded={12}
                            p={6}
                            borderWidth={3}
                            fontSize={14}
                            color='#000'
                            {...register('name')}
                        />
                        <Box position='absolute' top='2.7em' right={4} color='#aaa'>
                            <BsFillPersonFill size='1em' />
                        </Box>
                        <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                            { errors?.name && errors?.name?.message ? errors.name.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.birth ? true : false} mb={10} position='relative'>
                        <FormLabel htmlFor='birth' fontSize={12} color='#000'>Sua data de nascimento</FormLabel>
                        <Input
                            id='birth'
                            type='date'
                            rounded={12}
                            p={6}
                            borderWidth={3}
                            fontSize={14}
                            color='#000'
                            {...register('birth')}
                        />
                        <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                            { errors?.birth && errors?.birth?.message ? errors.birth.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>
                </Stack>

                <Stack direction='row' align='center' mb={10}>
                    <FormControl isInvalid={errors?.email ? true : false} position='relative'>
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
                            { errors?.email && errors?.email?.message ? errors.email.message.toString() : '' }
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
                            { errors?.password && errors?.password?.message ? errors.password.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>
                </Stack>
                
                <Stack direction='row' align='flex-start' mb={10}>
                    <FormControl isInvalid={errors?.gender ? true : false} position='relative'>
                        <FormLabel htmlFor='gender' fontSize={12} color='#000'>Seu gênero</FormLabel>
                        <RadioGroup name="gender" onChange={setGender} value={gender}>
                            <Stack direction='row'>
                                <Radio mr={10} value='Masculino' {...register('gender')}>
                                    <Text fontSize={14} color='#000'>Masculino</Text>
                                </Radio>
                                <Radio value='Feminino' {...register('gender')}>
                                    <Text fontSize={14} color='#000'>Feminino</Text>
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                            { errors?.gender && errors?.gender?.message ? errors.gender.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.height ? true : false} position='relative'>
                        <FormLabel htmlFor='height' fontSize={12} color='#000'>Sua altura</FormLabel>
                        <Input
                            id='height'
                            type='number'
                            min={100}
                            max={250}
                            rounded={12}
                            p={6}
                            borderWidth={3}
                            fontSize={14}
                            color='#000'
                            {...register('height')}
                        />
                        <Text fontSize={10} position='absolute' top='4.5em' right={4} color='rgba(0, 0, 0, .7)'>cm</Text>
                        <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                            { errors?.height && errors?.height?.message ? errors.height.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>
                </Stack>

                <Stack direction='row' align='center' mb={10}>
                    <FormControl isInvalid={errors?.country ? true : false} position='relative'>
                        <FormLabel htmlFor='country' fontSize={12} color='#000'>Seu país</FormLabel>
                        <Select
                            id='country'
                            rounded={12}
                            borderWidth={3}
                            fontSize={14}
                            color='#000'
                            size='lg'
                            {...register('country')}
                            placeholder="Escolha um país"
                        >
                            <option style={{ 'padding': '1.2rem', 'fontSize': '1rem', 'fontWeight': '500' }} value='Brasil'>Brazil</option>
                            <option style={{ 'padding': '1.2rem', 'fontSize': '1rem', 'fontWeight': '500' }} value='EUA'>EUA</option>
                            <option style={{ 'padding': '1.2rem', 'fontSize': '1rem', 'fontWeight': '500' }} value='Inglaterra'>Inglaterra</option>
                        </Select>
                        <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                            { errors?.country && errors?.country?.message ? errors.country.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.city ? true : false} position='relative'>
                        <FormLabel htmlFor='city' fontSize={12} color='#000'>Sua cidade</FormLabel>
                        <Input
                            id='city'
                            type='text'
                            min={100}
                            max={250}
                            rounded={12}
                            p={6}
                            borderWidth={3}
                            fontSize={14}
                            color='#000'
                            {...register('city')}
                        />
                        <FormErrorMessage fontSize={13} position='absolute' bottom='-25px' left={2}>
                            { errors?.height && errors?.city?.message ? errors.city.message.toString() : '' }
                        </FormErrorMessage>
                    </FormControl>
                </Stack>
                
                <Button display='block' w='300px' mx='auto' bg='mainBlue' shadow='md' fontSize={14} color='#fff' rounded='xl' mt={10} position='relative' isLoading={isSubmitting} _hover={{ bg: 'mainBlue', color: '#fff', opacity: '.8' }} type='submit'>
                    Registrar
                    <Box h={4} w={4} position='absolute' insetY={0} my='auto' right={24}>
                        <BsArrowRight size='1.2em' />
                    </Box>
                </Button>

                <Box w='100%' p={2} textAlign='center' marginTop={2}>
                    <Text fontSize={12} color='#000'>Já possui uma conta? <Link as={RouteLink} to='/' color='mainBlue'>Faça login agora mesmo!</Link></Text>
                </Box>
            </form>
            
            <SuccessAlertWithRedirect title='Uhuul' message='Cadastro realizado com sucesso!' linkToRedirect='/' buttonMessage='Fazer login' isOpen={isSuccessOpen} onClose={onSuccessClose} onOpen={onSuccessOpen} />
            <ErrorAlert title='Oops...' message={errorMessage} buttonMessage='Ok' isOpen={isErrorOpen} onClose={onErrorClose} onOpen={onErrorOpen} />
        </>
    )
}

export default RegisterForm