import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const userStorage = await AsyncStorage.getItem('user');
            if (userStorage) {
                setUser(JSON.parse(userStorage));
            }
        };

        loadUser();
    }, []);

    const saveUser = async (newUser) => {
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, setUser: saveUser }}>
            {children}
        </UserContext.Provider>
    )
}

