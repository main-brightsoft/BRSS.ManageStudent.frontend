import {baseAxios, authAxios} from '../common/CoreAxios';
import { StudentResponse } from "../types/Student/StudentResponse";
import { errorApiHandler } from "../common/ErrorApiHandler.tsx"; // Import the centralized error handler

const API_URL = 'http://localhost:5072/api/Student';

export const getStudents = async (): Promise<StudentResponse[]> => {
    try {
        const response = await baseAxios.get<StudentResponse[]>(API_URL);
        return response.data;
    } catch (error: any) {
        errorApiHandler(error);
    }
};

export const getStudent = async (id: string): Promise<StudentResponse> => {
    try {
        const response = await baseAxios.get<StudentResponse>(`${API_URL}/${id}`);
        return response.data;
    } catch (error: any) {
        errorApiHandler(error);
    }
};

export const addStudent = async (student: StudentResponse): Promise<StudentResponse> => {
    try {
        const response = await authAxios.post<StudentResponse>(API_URL, student);
        return response.data;
    } catch (error: any) {
        errorApiHandler(error);
    }
};

export const updateStudent = async (id: string, student: StudentResponse): Promise<void> => {
    try {
        await authAxios.put(`${API_URL}/${id}`, student);
    } catch (error: any) {
        errorApiHandler(error);
    }
};

export const deleteStudent = async (id: string): Promise<void> => {
    try {
        await authAxios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
        errorApiHandler(error);
    }
};

export const deleteManyStudents = async (ids: string[]): Promise<void> => {
    try {
        await authAxios.delete(`${API_URL}`, {
            data: ids
        });
    } catch (error: any) {
        errorApiHandler(error);
    }
};

const StudentService = {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteManyStudents,
};

export default StudentService;
