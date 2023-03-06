import React, { useState, useEffect } from 'react';
import { server_calls } from '../api';

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

export const useGetItemData = (stashId : string) => {
    const [stashItemData, setItemData] = useState<[]>([]);

    async function handleItemDataFetch(stashId: string) {
        const result = await server_calls.getStashItems(stashId);
        setItemData(result)
    };

    useEffect( () => {
        handleItemDataFetch(stashId);
    }, []);

    return {stashItemData, getData: handleItemDataFetch}
};

