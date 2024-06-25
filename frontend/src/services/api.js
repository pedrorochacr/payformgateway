import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
});


const useApi = () => ({
    createPixTransaction: async (value) => {
        //console.log(process.env.REACT_APP_BACKEND_URL)
        const response = await api.post('/createPixTransaction', {value});
        return response.data;
    },

    findData: async (id) => {
        const response = await api.post('/findData', {id});
        return response.data;
    }
});

export default useApi;