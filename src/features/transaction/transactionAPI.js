import axiosInstance from "../../utils/axios";

export const getTransactions = async () => {
    const res = await axiosInstance.get('/transactions');
    return res.data;
};

export const addTransaction = async (data) => {
    const res = await axiosInstance.post('/transactions', data);;
    return res.data;
}

export const editTransaction = async ({ id, data }) => {
    const res = await axiosInstance.put(`/transactions/${id}`, data);
    return res.data;
}
export const deleteTransaction = async (id) => {
    const res = await axiosInstance.delete(`/transactions/${id}`);
    return res.data;
}

