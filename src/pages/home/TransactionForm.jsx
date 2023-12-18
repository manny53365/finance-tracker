import { useState } from "react"


export default function TransactionForm() {

    const [transactionName, setTransactionName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({transactionName, amount})
    }

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