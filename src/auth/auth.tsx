import React, { useState, useEffect, createContext } from 'react';

export const TokenContext = createContext('');

function Auth() {
    const [ token, setToken ] = useState('');

    useEffect( () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, [] );

    return (
        <>
            <TokenContext.Provider value={ token }>
                
            </TokenContext.Provider>
        </>
    )
}