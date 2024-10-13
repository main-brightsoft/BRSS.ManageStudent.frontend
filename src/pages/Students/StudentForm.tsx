import React from 'react';
import {
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
} from '@mui/material';
import useStudentForm from '../../hooks/useStudentForm';
import { useNavigate } from "react-router-dom";

const StudentForm: React.FC = () => {
    const {
        student,
        errors,
        openConfirmDialog,
        editingStudent,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleChange,
        handleOpenConfirmDialog,
        handleCloseConfirmDialog,
        handleConfirmSave,
        handleCloseSnackbar,
    } = useStudentForm();
    const navigate = useNavigate();

    return (
        <div>
            <Typography variant="h4">{editingStudent ? 'Edit Student' : 'Add Student'}</Typography>
            <TextField
                margin="dense"
                label="Full Name"
                name="fullName"
                value={student.fullName}
                onChange={handleChange}
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName}
            />
            <TextField
                margin="dense"
                label="Date of Birth"
                name="dayOfBirth"
                type="date"
                value={student.dayOfBirth}
                onChange={handleChange}
                fullWidth
                error={!!errors.dayOfBirth}
                helperText={errors.dayOfBirth}
            />
            <TextField
                margin="dense"
                label="Phone Number"
                name="phoneNumber"
                value={student.phoneNumber}
                onChange={handleChange}
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
            />
            <TextField
                margin="dense"
                label="Address"
                name="address"
                value={student.address}
                onChange={handleChange}
                fullWidth
                error={!!errors.address}
                helperText={errors.address}
            />
            <DialogActions>
                <Button onClick={() => navigate('/students')}>Back to List</Button>
                <Button onClick={handleOpenConfirmDialog}>{editingStudent ? 'Update' : 'Add'}</Button>
            </DialogActions>

            {/* Confirmation Dialog */}
            <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Confirm {editingStudent ? 'Update' : 'Add'} Student</DialogTitle>
                <DialogContent>
                    Are you sure you want to {editingStudent ? 'update' : 'add'} this student?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
                    <Button onClick={handleConfirmSave} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Success/Error Messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default StudentForm;
