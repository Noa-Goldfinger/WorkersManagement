import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Button } from '@mui/material';
import { Delete, Edit, Add, Save, GetApp } from '@mui/icons-material'; 
import { useNavigate } from "react-router-dom";
import * as Actions from "../store/action";
import { CSVLink } from 'react-csv'; 
import { AddEmployee, EditEmployee, ChangeStatusEmployee } from "../service/setEmployees";
import SetEmployees from "../service/setEmployees";
import AddEmployeeForm from "../components/addEmployee";

const DataTable = () => {
  //לתקן את זה שלא רואים שינויים בטבלה, אלא רק אחרי ששומרת ( לחוץ ממחיקה שכן רואים)
  useEffect(() => {////להעביר למקום אחר
    dispatch(SetEmployees());
  }, []);

  const employees = useSelector(state => state.meantimeEmployees);
  const [employeesToSave, setEmployeesToSave] = useState(employees);
  const employeesDel = useSelector(state => state.meantimeEmployeesToDell);
  const employeesAdd = useSelector(state => state.meantimeEmployeesToAdd);
  const employeesEdit = useSelector(state => state.meantimeEmployeesToEdit);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEmployeesToSave(employees);
    console.log(employees);/////////////////////////////////////////////////////////////////////
    console.log(employeesToSave);/////////////////////////////////////////////////////////////////////
  }, [employees]); // Run the effect whenever employees changes

  const handleEdit = (id) => {
    const emp = employees.find(e => e.id === id);
    console.log(emp);
    const positions = emp.employeePositions.map(position => ({
      positionId: position.positionId,
      positionEntry: position.positionEntry ? position.positionEntry.split('T')[0] : '', // Check if positionEntry exists before splitting
      ifManagerial: position.ifManagerial
    }));

    const existingEmployeeData = {
      id: id,
      fName: emp.fName, 
      lName: emp.lName,
      tz: emp.tz,
      dateBirth: emp.dateBirth ? emp.dateBirth.split('T')[0] : '',
      gender: emp.gender,
      positions: positions,
      startWorkDate: emp.startWorkDate ? emp.startWorkDate.split('T')[0] : ''
    };

    dispatch({ type: Actions.SET_MEANTIME_EMPLOYEES, payload: employeesToSave });

    navigate('/editEmployee', { state: { existingEmployeeData } });

    console.log("Edit employee with ID:", id);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employeesToSave.map(employee => {
      if (employee.id === id) {
        return { ...employee, isActive: false };
      }
      return employee;
    });

    const deletedEmployee = employeesToSave.find(employee => employee.id === id);
    if (deletedEmployee) {
      dispatch({ type: Actions.DELL_MEANTIME_EMPLOYEES, payload: deletedEmployee });
    }
    setEmployeesToSave(updatedEmployees);

    console.log("Delete employee with ID:", id);
    console.log(employees);
  };

  const handleAdd = () => {
    console.log(employees);
    dispatch({ type: Actions.SET_MEANTIME_EMPLOYEES, payload: employeesToSave });
    navigate("/addEmployee");
    console.log("Add new employee");
  };

  const handleSaveChanges = React.useCallback(() => {
    console.log(employeesDel);
    if (!!employeesDel)
      employeesDel?.forEach(e => {
        dispatch(ChangeStatusEmployee(e.id));
      });
    if (!!employeesAdd)
      employeesAdd?.forEach(e => {
        dispatch(AddEmployee(e));
      });
    if (!!employeesEdit)
      employeesEdit?.forEach(e => {
        dispatch(EditEmployee(e.id, e))
      })

      dispatch(SetEmployees());
  }, [employeesAdd, employeesDel, employeesEdit, dispatch])

  const columns = [
    { field: 'fName', headerName: 'First name', width: 130 },
    { field: 'lName', headerName: 'Last name', width: 130 },
    { field: 'tz', headerName: 'Tz', width: 130 },
    { field: 'startWorkDate', headerName: 'startWorkDate', width: 130, type: 'Date' },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <div className='tableContainer'>
      <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
        Add Entry
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={employeesToSave?.filter(employee => employee.isActive) ?? []}
          columns={columns ?? []}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <Button variant="contained" startIcon={<Save />} onClick={handleSaveChanges}>
        Save Changes
      </Button>
      {!!employeesToSave && <CSVLink data={employeesToSave?.filter(employee => employee.isActive) ?? []} filename={"employee_list.csv"} >
        <Button variant="contained" startIcon={< GetApp />} style={{ marginLeft: '10px' }}>
          Export to CSV
        </Button>
      </CSVLink>}
    </div>
  );
}

export default DataTable;