import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

interface SignupData {
    email: string;
    password: string;
    name: string;
}

interface VerifyEmailData {
    email: string;
    codeEmailVerify: string;
}

interface SigninData {
    email: string;
    password: string;
}

interface ApiError {
    response?: {
        data: any;
    };
}

export const signup = async (userData: SignupData): Promise<any> => {
    try {
        const response = await api.post('/signup', userData);
        return response.data;
    } catch (error) {
        const apiError = error as ApiError;
        throw apiError.response ? apiError.response.data : new Error('Server Error');
    }
};

export const verifyEmail = async (verificationData: VerifyEmailData): Promise<any> => {
    try {
        const response = await api.post('/verify', verificationData);
        return response.data;
    } catch (error) {
        const apiError = error as ApiError;
        throw apiError.response ? apiError.response.data : new Error('Server Error');
    }
};

export const signin = async (loginData: SigninData): Promise<any> => {
    try {
        const response = await api.post('/signin', loginData);
        return response.data;
    } catch (error) {
        const apiError = error as ApiError;
        throw apiError.response ? apiError.response.data : new Error('Server Error');

    }
};
