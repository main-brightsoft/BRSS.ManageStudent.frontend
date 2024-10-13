import React from 'react';
import moment from 'moment';
import {
    Typography,
    CircularProgress,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import useStudentList from "../../hooks/useStudentList.tsx";

const StudentList: React.FC = () => {
    const {
        students,
        loading,
        error,
        selectedIds,
        handleSelectionModelChange,
        handleDeleteSelectedStudents,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        handleDeleteStudent
    } = useStudentList();

    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: 'fullName', headerName: 'Full Name', flex: 1 },
        {
            field: 'dayOfBirth',
            headerName: 'Date of Birth',
            flex: 1,
            valueFormatter: (params) => params.value ? moment(params.value).format('MMM D, YYYY') : 'N/A'
        },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => (
                <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/students/form', {state: params.row})}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteStudent(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
            flex: 1,
        },
    ];

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    // @ts-ignore
    return (
        <>
            <Button variant="contained" color="primary" onClick={() => navigate('/students/form')}>
                Add Student
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelectedStudents}
            >
                Delete Selected
            </Button>

            <div style={{ minHeight: 400, width: '100%', marginTop: '20px' }}>
                <DataGrid
                    rows={students}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection // Enable checkbox selection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={handleSelectionModelChange}
                    selectionModel={selectedIds} // Bind selected IDs from hook
                />
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default StudentList;
