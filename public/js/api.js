const api = {
    get: async (url) => {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
    },

    post: async (url, data) => {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },

    login: async (data) => {
        return await api.post('/api/login', data)
    },

    register: async (data) => {
        return await api.post('/api/register', data)
    },

    add_vehicle: async (data) => {
        return await api.post('/api/add_vehicle', data)
    },

    get_vehicles: async () => {
        return await api.get('/api/get_vehicles')
    },

    generate: async (props) => {
        console.log(props)
        return await api.post('/api/generate', props)
    }
}


export default api;
