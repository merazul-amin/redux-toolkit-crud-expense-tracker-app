import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const { transactions, isLoading, isError, error, editing } = useSelector(state => state.transaction);
    const dispatch = useDispatch();

    //decide what to render
    let content = null;
    if (isLoading) content = 'Loading';
    if (!isLoading && isError) content = 'There is an error'
    if (!isLoading && !isError && transactions.length === 0) content = 'No Transaction found'
    if (!isLoading && !isError && transactions.length > 0) {
        content = transactions.map(transaction => <Transaction transaction={transaction} />)
    }
    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch])
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
