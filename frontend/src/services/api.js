import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
});


const useApi = () => ({
    createPixTransaction: async (data) => {
        const response = await api.post('/createPixTransaction',data);
        return response.data;
    },

    findData: async (id) => {
        const response = await api.post('/findData', {id});
        return response.data;
    },

    createCreditTransaction: async (value, numberCard, CVV, name, expirationDate, orderId, installmentNumber, rememberCard, costumerId, cardId, transactionId) => {
        const response = await api.post('/createCreditTransaction', {value, numberCard, CVV, name, expirationDate, orderId, installmentNumber, rememberCard, costumerId, cardId,transactionId});
        return response.data;
    },

    createBoletoTransaction: async (value, costumerId,transactionId) => {
        const response = await api.post('/createBoletoTransaction', {value, costumerId,transactionId});
        return response.data;
    }
});

export default useApi;