// src/UserContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the user data
interface User {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    role: string;
}

// Define the shape of the context
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
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(API_BASE_URL);  
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
 