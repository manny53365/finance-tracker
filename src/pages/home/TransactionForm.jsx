import { useEffect, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore";


export default function TransactionForm({ uid }) {

    const [transactionName, setTransactionName] = useState('');
    const [amount, setAmount] = useState('');
    const { addDocument, response } = useFirestore('transactions');

    const handleSubmit = (event) => {
        event.preventDefault();
        addDocument({uid, transactionName, amount});
    }

    useEffect(() => {
        if(response.success){
            setTransactionName('');
            setAmount('');
        };
    }, [response.success]);

    return (
        <>
            <h3>Add a transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                    type="text"
                    required
                    onChange={(event) => setTransactionName(event.target.value)}
                    value={transactionName}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                    type="text"
                    required
                    onChange={(event) => setAmount(event.target.value)}
                    value={amount}
                    />
                </label>
                <button>Add transaction</button>
            </form>
        </>
    )
}