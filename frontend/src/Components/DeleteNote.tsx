import {
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { deleteNote } from '../Redux/NotesSlice';
import { useNavigate } from 'react-router-dom';

type DeleteNoteProps = {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteNote = ({ isOpen, onClose }: DeleteNoteProps) => {
    const toast = useToast({
        position: 'top',
        duration: 2000,
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedNote = useAppSelector(state => state.notes.selectedNote);

    const handleDelete = () => {
        dispatch(deleteNote(selectedNote));
        toast({
            title: 'Note Deleted Successfully',
            status: 'success',
        });
        navigate('/notes');
        onClose();
    };

    const handleClose = () => {
        onClose();
        navigate('/notes');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent 
                maxW={{ base: '90%', sm: '400px' }} // Responsive width
                mx="auto" // Center the modal
                p={{ base: 4, md: 6 }} // Responsive padding
            >
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>
                    <Text>Are you sure you want to delete this note?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={handleDelete}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteNote;
