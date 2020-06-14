import React,{ useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";
const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];
// console.log(initialExpenses);

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState('');

  const handleCharge = e => {
    setCharge(e.target.value); 
  }
  const handleAmount = e => {
    setAmount(e.target.value); 
  }
  const [alert,setAlert] = useState({show:false});

  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show: false})
    },10000);
  }
  const handleSubmit = e => {
    e.preventDefault(); 
    if(charge !== "" && amount > 0){
      const singleExpense = {id:uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setAmount('');
      setAmount('')    
      handleAlert({type:"success", text:"text added"});
    }
    else{
      handleAlert({type:"danger", text:"charge can't be empty value"});

    }
  }


  const clearItems = () =>{
    setExpenses([]);
    handleAlert({type: "danger", text: "all items deleted"});

  }

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: "danger", text: "item deleted"});

  }
  const handleEdit = (id) => {

  }



  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
      <ExpenseForm handleAmount={handleAmount}  handleCharge={handleCharge}  handleSubmit={handleSubmit} charge={charge} amount={amount} />
      <ExpenseList expenses={expenses} handleDelete={handleDelete}  handleEdit={handleEdit} clearItems={clearItems}  />
      </main>
      <h1>
        total spending : <span className="total">
          $ {expenses.reduce((acc,curr)=>{
            return (acc+= parseInt(curr.amount));
          },0)}
        </span>
      </h1>
      
    </>
  );
}

export default App;
