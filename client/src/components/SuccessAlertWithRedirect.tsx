import { useRef } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import {
    Text,
    Link,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent
} from '@chakra-ui/react'
import { GiPartyPopper } from 'react-icons/gi'

interface AlertProps {
    title: string,
    message: string,
    linkToRedirect: string,
    buttonMessage: string,
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const SuccessAlertWithRedirect = ({ title, message, linkToRedirect, buttonMessage, isOpen, onOpen, onClose }: AlertProps) => {
    const cancelRef = useRef(null)

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered={true}>
            <AlertDialogOverlay>
                <AlertDialogContent w='410px' rounded='xl' overflow='hidden'>
                    <AlertDialogHeader display='flex' alignItems='center' bg='mainGreen' color='#fff' py={3} px={6} mb={4}>
                        <GiPartyPopper size='1.3em' />
                        <Text fontSize='lg' fontWeight='bold' ml={4}>{title}</Text>
                    </AlertDialogHeader>
                    <AlertDialogBody color='#000'>
                        {message}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Link as={RouteLink} to={linkToRedirect} rounded='lg' p={2} bg='mainGreen' color='#fff' ref={cancelRef} onClick={onClose} _hover={{ textDecoration: 'none' }}>{buttonMessage}</Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default SuccessAlertWithRedirect