import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Button } from '@mui/material';
import { Delete, Edit, Add, Save, GetApp } from '@mui/icons-material';
import * as Actions from "../store/action";
import { CSVLink } from 'react-csv';
import { AddEmployee, EditEmployee, ChangeStatusEmployee } from "../service/setEmployees";
import SetEmployees from "../service/setEmployees";
import FormDialog from "../components/addEmployee";

const DataTable = () => {
  const employees = useSelector(state => state.meantimeEmployees);
  const [employeesToSave, setEmployeesToSave] = useState(employees);  
  const [employeeDataToUpdate, setEmployeeDataToUpdate] = useState(null);  
  const [dialogOpen, setDialogOpen] = useState(false); 

  useEffect(() => {////להעביר למקום אחר
    if (!employees.length) {
      dispatch(SetEmployees());
    }
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmployeesToSave(employees);
  }, [employees]);

  const handleEdit = (id) => {
    const emp = employees.find(e => e.id === id);
    const positions = emp.employeePositions.map(position => ({
      positionId: position.positionId,
      positionEntry: position.positionEntry ? position.positionEntry.split('T')[0] : '',
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

    setEmployeeDataToUpdate(existingEmployeeData);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employeesToSave.map(employee => {
      if (employee.id === id) {
        return { ...employee, isActive: false, status: 'delete' };
      }
      return employee;
    });
    dispatch({ type: Actions.SET_MEANTIME_EMPLOYEES, payload: updatedEmployees });
    setEmployeesToSave(updatedEmployees);
  };

  const handleAdd = () => {
    setDialogOpen(true); 
    setEmployeeDataToUpdate(null);
  };

  const handleSaveChanges = React.useCallback(() => {
    employeesToSave?.forEach(async e => {
        if (e.status)
            if (e.status === 'delete') {
                delete e.status;
                await dispatch(ChangeStatusEmployee(e.id));
            }
            else if (e.status === 'add') {
                delete e.status;
                await dispatch(AddEmployee(e));
            }
            else {
                delete e.status;
                await dispatch(EditEmployee(e.id, e))
            }
    });
    dispatch(SetEmployees());
}, [employeesToSave, dispatch])

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
      <FormDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} existingEmployeeData={employeeDataToUpdate}/>
    </div>
  );
}

export default DataTable;