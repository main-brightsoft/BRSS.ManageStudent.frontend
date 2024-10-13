import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StudentResponse } from '../types/Student/StudentResponse';
import StudentService from '../services/StudentService';

const useStudentForm = () => {
    const location = useLocation();

    const [student, setStudent] = useState<StudentResponse>({
        id: '',
        fullName: '',
        dayOfBirth: '',
        phoneNumber: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        dayOfBirth: '',
        phoneNumber: '',
        address: '',
    });

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const editingStudent = location.state as StudentResponse;

    useEffect(() => {
        if (editingStudent) {
            setStudent(editingStudent);
        }
    }, [editingStudent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
    };

    const validateFields = () => {
        let validationErrors = { fullName: '', dayOfBirth: '', phoneNumber: '', address: '' };
        let isValid = true;

        if (!student.fullName) {
            validationErrors.fullName = 'Full Name is required';
            isValid = false;
        }

        if (!student.dayOfBirth) {
            validationErrors.dayOfBirth = 'Date of Birth is required';
            isValid = false;
        }

        if (!student.phoneNumber || !/^\d{10}$/.test(student.phoneNumber)) {
            validationErrors.phoneNumber = 'Phone Number is required and should be 10 digits';
            isValid = false;
        }

        if (!student.address) {
            validationErrors.address = 'Address is required';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (validateFields()) {
            try {
                if (editingStudent) {
                    await StudentService.updateStudent(editingStudent.id, student);
                    setSnackbarMessage('Student updated successfully!');
                    setSnackbarSeverity('success');
                } else {
                    await StudentService.addStudent(student);
                    setSnackbarMessage('Student added successfully!');
                    setSnackbarSeverity('success');
                }
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage('Failed to save student. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const handleOpenConfirmDialog = () => {
        if (validateFields()) {
            setOpenConfirmDialog(true);
        }
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirmSave = async () => {
        await handleSave();
        handleCloseConfirmDialog();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return {
        student,
        errors,
        openConfirmDialog,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        editingStudent,
        handleChange,
        handleOpenConfirmDialog,
        handleCloseConfirmDialog,
        handleConfirmSave,
        handleCloseSnackbar,
    };
};

export default useStudentForm;
