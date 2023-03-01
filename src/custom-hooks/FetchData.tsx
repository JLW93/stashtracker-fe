import React, { useState, useEffect } from 'react';
import { server_calls } from '../api';
// TODO import stash_id from somewhere

export const useGetData = () => {
    const [stashData, setData] = useState<[]>([]);

    async function handleDataFetch() {
        const result = await server_calls.getStashes();
        setData(result)
    };

    useEffect( () => {
        handleDataFetch();
    }, []);

    return {stashData, getData: handleDataFetch}
};

// export const useGetItemData = () => {
//     const [stashItemData, setItemData] = useState<[]>([]);

//     async function handleItemDataFetch() {
//         const result = await server_calls.getStashItems(stash_id);
//         setItemData(result)
//     };

//     useEffect( () => {
//         handleItemDataFetch();
//     }, []);

//     return {stashItemData, getData: handleItemDataFetch}
// };