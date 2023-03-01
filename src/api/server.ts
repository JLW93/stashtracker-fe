// import token from '../components/LogIn';

let token = '1234'

export const server_calls = {
    getStashes: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/stashes`, {
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

    createStash: async ( data: any = {} ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/stashes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to add Stash to the server.')
        };

        return await response.json()
    },

    updateStash: async ( stash_id: string, data: any = {} ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/stashes/${stash_id}`, {
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
        const response = await fetch(`http://127.0.0.1:5000/api/stashes/${stash_id}`, {
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
        const response = await fetch(`http://127.0.0.1:5000/api/stashes/${stash_id}/items`, {
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
        const response = await fetch(`http://127.0.0.1:5000/api/stashes/${stash_id}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to add Item to the Stash.')
        };

        return await response.json()
    },

    updateStashItem: async ( stash_id: string, item_id: string, data: any = {} ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/stashes/${stash_id}/items/${item_id}`, {
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
        const response = await fetch(`http://127.0.0.1:5000/api/stashes/${stash_id}/items/${item_id}`, {
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
    }
}