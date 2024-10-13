import { useState, useEffect } from 'react';
import { getStudents, addStudent, updateStudent, deleteStudent, deleteManyStudents } from '../services/StudentService';
import { StudentResponse } from "../types/Student/StudentResponse.tsx";

const useStudentList = () => {
    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]); // Added state for selected IDs

    useEffect(() => {
        const loadStudents = async () => {
            try {
                setLoading(true);
                const data = await getStudents();
                setStudents(data);
            } catch (err: any) {
                setError('Failed to fetch students. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadStudents();
    }, []);

    const handleAddStudent = async (student: StudentResponse) => {
        try {
            const newStudent = await addStudent(student);
            setStudents((prev) => [...prev, newStudent]);
        } catch {
            setError('Failed to add student.');
        }
    };

    const handleUpdateStudent = async (id: string, student: StudentResponse) => {
        try {
            await updateStudent(id, student);
            setStudents((prev) => prev.map((s) => (s.id === id ? student : s)));
        } catch (e: any) {
            setError(e.messages || 'Failed to update student.');
        }
    };

    const handleDeleteStudent = async (id: string) => {
        try {
            await deleteStudent(id);
            setStudents((prev) => prev.filter((student) => student.id !== id));
        } catch {
            setError('Failed to delete student.');
        }
    };

    const handleDeleteManyStudents = async (ids: string[]) => {
        try {
            await deleteManyStudents(ids);
            setStudents((prev) => prev.filter((student) => !ids.includes(student.id)));
            setSelectedIds([]); // Clear selected IDs after deletion
        } catch {
            setError('Failed to delete students.');
        }
    };

    const handleSelectionModelChange = (newRowSelectionModel: any) => {
        setSelectedIds(newRowSelectionModel); // Update selected IDs
    };

    const handleDeleteSelectedStudents = async () => {
        if (selectedIds.length > 0) {
            await handleDeleteManyStudents(selectedIds);
        } else {
            alert('No students selected for deletion.');
        }
    };

    return {
        students,
        loading,
        error,
        handleAddStudent,
        handleUpdateStudent,
        handleDeleteStudent,
        handleDeleteManyStudents,
        selectedIds,
        handleSelectionModelChange,
        handleDeleteSelectedStudents,
        snackbarOpen,
        snackbarMessage,
        setSnackbarOpen,
        setSnackbarMessage,
    };
};

export default useStudentList;
