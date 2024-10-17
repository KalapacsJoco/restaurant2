import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; 

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    // console.log(localStorage.getItem('token'))
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    async function getUser() {
        if (!token) return;
        
        const response = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`, // Visszaillesztés szintaxis javítása
            },
        });
        // console.log(`Bearer ${token}`)


        if (response.ok) {
            const data = await response.json();
            setUser(data);
        } else {
            console.error('Failed to fetch user data');
        }
    }

    useEffect(() => {
        // console.log(token);
        if (token) {
            getUser();
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser, cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
