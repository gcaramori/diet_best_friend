import { useRef } from 'react'
import {
    Text,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent
} from '@chakra-ui/react'
import { BiError } from 'react-icons/bi'

interface AlertProps {
    title: string,
    message: string,
    buttonMessage: string,
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const ErrorAlert = ({ title, message, buttonMessage, isOpen, onOpen, onClose }: AlertProps) => {
    const cancelRef = useRef(null)

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered={true}>
            <AlertDialogOverlay>
                <AlertDialogContent w='410px' rounded='xl' overflow='hidden'>
                    <AlertDialogHeader display='flex' alignItems='center' bg='mainRed' color='#fff' py={3} px={6} mb={4}>
                        <BiError size='1.3em' />
                        <Text fontSize='lg' fontWeight='bold' ml={4}>{title}</Text>
                    </AlertDialogHeader>
                    <AlertDialogBody color='#000'>
                        {message}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg='mainRed' color='#fff' ref={cancelRef} onClick={onClose}>{buttonMessage}</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ErrorAlert