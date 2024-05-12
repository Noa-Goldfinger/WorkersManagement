import './App.css';
import TableCustomized from '../src/components/employeesList'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SetEmployees from "./service/setEmployees";
import SetPositions from "./service/setPositions"
import { Route, Routes } from "react-router-dom";
import AddEmployeeForm from './components/addEmployee';
// import HomePage from "../src/components/homePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetEmployees());
    dispatch(SetPositions());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TableCustomized />} />
      </Routes>
    </div>
  );
}

export default App;

