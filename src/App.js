import './App.css';
import { useState } from 'react';
import { 
  useFetchexpensesQuery, 
  useAddExpenseMutation, 
  useDeleteExpenseMutation, 
  useUpdateExpenseMutation 
} from './store';


function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  const { data: expensesFromServer = [], refetch } = useFetchexpensesQuery('1');
  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const totalexpenses = expensesFromServer.length;
  const totalAmount = expensesFromServer.reduce(
    (sum, expense) => sum + (parseFloat(expense.amount) || 0),
    0
  );

  const handleChange = (event) => {
    setExpense(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (expense && amount) {
      if (isEditing) {

        await updateExpense({
          id: currentExpenseId,
          name: expense,
          amount: parseFloat(amount),
        });
        setIsEditing(false);
        setCurrentExpenseId(null);
      } else {

        const newExpense = { name: expense, amount: parseFloat(amount) };
        await addExpense(newExpense);
      }
      refetch();
      setExpense("");
      setAmount("");
    }
  };

  const rmState = async (expenseItem) => {
    await deleteExpense(expenseItem.id);
    refetch();
  };

  const edState = (expenseItem) => {
    setExpense(expenseItem.name);
    setAmount(expenseItem.amount.toString());
    setIsEditing(true);
    setCurrentExpenseId(expenseItem.id);
  };


  const renderedList = expensesFromServer.map((value, index) => (
    <div 
      key={value.id} 
      className='list-31'
    >
      <p>{value.name} - ${value.amount}</p>
      <button 
        className='button-31'
        onClick={() => rmState(value)}
      >
        Delete <img src="https://img.icons8.com/emoji/48/000000/wastebasket-emoji.png" alt="delete" className="w-6 h-6" />
      </button>
      <button 
        onClick={() => edState(value)}
        className='button-31'
      >
        Edit <img width="26" height="26" src="https://img.icons8.com/metro/26/edit.png" alt="edit" className="w-6 h-6"/>
      </button>
    </div>
  ));

  return (
    <div 
   
      style={{ backgroundImage: `url('https://source.unsplash.com/random/1600x900')` }} 
    >
      <div >

        <p >Total : {totalexpenses}</p>
        <p >Total Amount: ${totalAmount.toFixed(2)}</p>
        
        <form onSubmit={submit} className='form-31' >
          <input 
            value={expense} 
            onChange={handleChange} 
            placeholder="Add name"
            type="text"
          />
          <input 
            value={amount} 
            onChange={handleAmountChange} 
            type="number"
            placeholder="Add amount"
          />
          <button 
            type="submit" 
            className='button-32'
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </form>
        
        <div className="w-full">
          {renderedList}
        </div>
      </div>
    </div>
  );
}

export default App;
