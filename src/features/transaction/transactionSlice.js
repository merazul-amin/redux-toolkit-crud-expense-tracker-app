import { bindActionCreators, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
    editing: {}
};

// async thunks

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransactions();
    return transactions;
});

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transactions = await addTransaction(data)
    return transactions;
});

export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
    const transactions = await editTransaction({ id, data })
    return transactions;
});

export const removeTransaction = createAsyncThunk('transaction/removeTransaction', async (id) => {
    const transactions = await deleteTransaction(id);
    return transactions;
});

//create slice

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInactive: (state) => {
            state.editing = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.transactions = ''
            })
            // createTransactions
            .addCase(createTransaction.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            //edit transactions
            .addCase(changeTransaction.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id)
                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            //delete transaction.
            .addCase(removeTransaction.pending, (state, action) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = state.transactions.filter(t => t.id !== action.meta.arg)
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })

    }
})

export default transactionSlice.reducer;

export const { editActive, editInactive } = transactionSlice.actions;