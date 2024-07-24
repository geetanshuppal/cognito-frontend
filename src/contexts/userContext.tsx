// src/UserContext.tsx

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';

// Define the shape of the user data
interface User {
    name?:string;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
    role?: string;
}

interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
}

const API_BASE_URL = 'https://llqwp3a2sg.execute-api.us-east-2.amazonaws.com/stage/api';


export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const authContext = useContext(AuthContext);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {authStatus} = authContext
// https://llqwp3a2sg.execute-api.us-east-2.amazonaws.com/stage/api/getUsers

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                const response = await axios.get(`${API_BASE_URL}/getUsers`,{
                    headers: {
                        Authorization: `${accessToken}`
                    }
                });  
                setUsers(response?.data?.response);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [authStatus]);

    return (
        <UserContext.Provider value={{ users, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
 