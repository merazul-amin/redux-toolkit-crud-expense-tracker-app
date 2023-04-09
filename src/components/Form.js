import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeTransaction, createTransaction } from '../features/transaction/transactionSlice';
export default function Form() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, isError, error } = useSelector(state => state.transaction)
    const { editing } = useSelector(state => state.transaction);

    //listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        }
        else {
            setEditMode(false)
            reset();
        }
    }, [editing])

    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    }
    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }))
        reset()
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransaction({
            id: editing.id,
            data: {
                name: name,
                amount: amount,
                type
            }
        }))
        reset();
        setEditMode(false)
    }
    const cancelEditMode = () => {
        setEditMode(false)
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={editMode ? handleUpdate : handleCreate}>



                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="enter title"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={e => setType('income')}
                            required
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={e => setType('expense')}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                </div>

                <button disabled={isLoading} className="btn" type='submit'>{editMode ? 'Update Transaction' : 'Add Transaction'}</button>
                <p className="error">{!isLoading && isError && 'There was an error.'}</p>
            </form>
            {editMode && <button onClick={cancelEditMode} className="btn cancel_edit">Cancel Edit</button>}
        </div>
    );
}
