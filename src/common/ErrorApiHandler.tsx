import { BaseException } from "../types/Exception/BaseException";

export const errorApiHandler = (error: any) => {
    if (error.response) {
        const res: BaseException = error.response.data;

        if (res.errors && typeof res.errors === 'object') {
            const detailedErrors = extractDetailedErrors(res.errors);
            throw new Error(detailedErrors);
        }

        const errorMessage = res.userMessage || res.devMessage || 'An unexpected error occurred.';
        throw new Error(errorMessage);
    } else if (error.request) {
        throw new Error('No response from server. Please check your network.');
    } else {
        throw new Error('An unexpected error occurred. Please try again.');
    }
};

const extractDetailedErrors = (errors: any): string => {
    if (Array.isArray(errors)) {
        return errors.map((err: any) => err.message || JSON.stringify(err)).join(', ');
    } else if (typeof errors === 'object') {
        return Object.values(errors)
            .map((err: any) => err.message || JSON.stringify(err))
            .join(', ');
    } else {
        return errors.toString();
    }
};
