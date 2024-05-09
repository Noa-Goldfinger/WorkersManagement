// import logo from './logo.svg';
import './App.css';
import TableCustomized from '../src/components/employeesList'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SetEmployees from "./service/setEmployees";
import SetPositions from "./service/setPositions"
import { Route, Routes } from "react-router-dom";
import AddEmployeeForm from './components/addEmployee';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetEmployees());
    dispatch(SetPositions());
  }, []);
  return(
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Entrance />} /> */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/homePage" element={<HomePage />} /> */}
        <Route path="/" element={<TableCustomized />} />
        <Route path="/employees" element={<TableCustomized />} />
        <Route path="/addEmployee" element={<AddEmployeeForm />} />
        <Route path="/editEmployee" element={<AddEmployeeForm />} />
        {/* <Route path="/recipe/editRecipe" element={<AddRecipe />} /> */}
        {/* <Route path="/myRecipes" element={<MyRecipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/shoppingList" element={<ShoppingList />} /> */}
      </Routes>
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
    </div>
    );
}

export default App;

