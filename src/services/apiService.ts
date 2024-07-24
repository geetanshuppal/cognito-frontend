import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://llqwp3a2sg.execute-api.us-east-2.amazonaws.com/stage/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json,text/plain, multipart/form-data,application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true,
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

export const signup = async (userData: SignupData): Promise<AxiosResponse<any>> => {
    try {
        const response = await api.post('/signup', userData);
        return response.data;
    } catch (error) {
        const apiError = error as ApiError;
        throw apiError.response ? apiError.response.data : new Error('Server Error');
    }
};

export const verifyEmail = async (verificationData: VerifyEmailData): Promise<AxiosResponse<any>> => {
    try {
        const response = await api.post('/verify', verificationData);
        return response.data;
    } catch (error) {
        const apiError = error as ApiError;
        throw apiError.response ? apiError.response.data : new Error('Server Error');
    }
};

export const signin = async (loginData: SigninData): Promise<AxiosResponse<any>> => {
    try {
        const response = await api.post('/signin', loginData);
        return response.data;
    } catch (error) {
        const apiError = error as ApiError;
        throw apiError.response ? apiError.response.data : new Error('Server Error');

    }
};
