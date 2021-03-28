import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export const UserContext = React.createContext(null);

export const Authenticate = (email, password) => {
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({strategy: "local", email: email, password: password})
    };
    return fetch("http://localhost:3030/authentication", fetchOptions).then(response => {
        if(!response.ok){
            return 400;
        }
        return response.json();
    });
};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const res = await Authenticate(email, password);
        console.log(res);
        if(res.accessToken){
            var usr = {
                email: res.user.email
                //role: res.role
            }
            setUser(usr);
            localStorage.setItem('token',res.accessToken);
            return 'granted';
        }
        return 'incorrect login';
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        return [];
    }

    const values = React.useMemo(() => ({ user, login, logout }), [user]);

    // Finally, return the interface that we want to expose to our other components
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = React.useContext(UserContext);

    if(context === undefined) {
        throw new Error('useUser hook by used within a UserProvider component')
    }
    return context;
};