import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
});


const useApi = () => ({
    createPixTransaction: async (value) => {
        const response = await api.post('/createPixTransaction', {value});
        return response.data;
    },

    findData: async (id) => {
        const response = await api.post('/findData', {id});
        return response.data;
    },

    createCreditTransaction: async (value, numberCard, CVV, name, expirationDate) => {
        const response = await api.post('/createCreditTransaction', {value, numberCard, CVV, name, expirationDate});
        return response.data;
    },

    createBoletoTransaction: async (value, costumerId) => {
        const response = await api.post('/createBoletoTransaction', {value, costumerId});
        return response.data;
    }
});

export default useApi;