// src/UserContext.tsx

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';

// Define the shape of the user data
interface User {
    UserStatus: ReactNode;
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/getUsers`,{
                    headers: {
                        Authorization: `${accessToken}`
                    }
                });  
                if(response?.data?.statusCode == 200){
                    setUsers(response?.data?.response);
                    return
                }
                setError(response?.data?.response);
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
 