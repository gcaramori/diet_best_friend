import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'

const SocialLogin: React.FC = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <Flex justifyContent='center' alignItems='center' w='100%' paddingBottom={10}>
            <Button w={14} h={12} rounded='lg' shadow='sm' fontSize={16} bg='#f7f0f0' border='1px solid #dfdede' _hover={{ bg:'#fff' }} onClick={() => login()}>
                <FcGoogle />
            </Button>
        </Flex>
    )
}

export default SocialLogin