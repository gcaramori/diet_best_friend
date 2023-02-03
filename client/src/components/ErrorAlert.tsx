import { useRef } from 'react'
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    useDisclosure
} from '@chakra-ui/react'

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
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {message}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>{buttonMessage}</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ErrorAlert