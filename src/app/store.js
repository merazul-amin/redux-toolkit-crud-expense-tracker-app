import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "../features/transaction/transactionSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionSlice
    },
});
