import { token } from "./token";

export const server_calls = {

    getStashes: async () => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Stashes from the server.')
        };

        return await response.json()
    },

    createStash: async ( data: any = {}) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to add Stash to the server.')
        };

        return await response.json()
    },

    updateStash: async ( stash_id: string, data: any = {} ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update Stash.')
        };

        return await response.json()
    },

    deleteStash: async ( stash_id: string ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete Stash from the server.')
        };

        return await response.json()
    },

    getStashItems: async ( stash_id: string ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Stash Items from the server.')
        };

        return await response.json()
    },

    getStashItem: async ( stash_id: string, item_id: string ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}/items/${item_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Stash Items from the server.')
        };

        return await response.json()
    },

    createStashItem: async ( stash_id: string, data: any = {} ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to add Item to the Stash.')
        };

        return await response.json()
    },

    updateStashItem: async ( stash_id: string, item_id: string, data: any = {} ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}/items/${item_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update Stash Item.')
        };

        return await response.json()
    },

    deleteStashItem: async ( stash_id: string, item_id: string ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/api/stashes/${stash_id}/items/${item_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete Item from the Stash.')
        };

        return await response.json()
    },

    getPriceData: async ( item_name: string ) => {
        const response = await fetch(`https://www.pricecharting.com/api/product?t=d69e7f507b53112fdf080870755f01ba5172ee48&q=${item_name}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve pricing data.')
        };

        return await response.json()

        // use graded-price, loose-price, product-name, console name
        // prices are shown in penny amount, need to be formatted
    },

    getUserData: async () => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/get-user-data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve User data.')
        }; 

        return await response.json()
    },

    updateUserData: async ( data: any = {} ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/update-data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update User data.')
        }; 

        return await response.json()
    },

    updateUserPassword: async ( token: string, data: any = {} ) => {
        const response = await fetch(`https://enthusiastic-sweltering-group.glitch.me/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update password.')
        }; 

        return await response.json()
    }
}