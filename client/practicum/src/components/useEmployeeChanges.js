import { useSelector } from 'react-redux';

const useEmployeeChanges = () => {
  const employeesDel = useSelector(state => state.meantimeEmployeesToDell);
  const employeesAdd = useSelector(state => state.meantimeEmployeesToAdd);
  const employeesEdit = useSelector(state => state.meantimeEmployeesToEdit);
  
  return { employeesDel, employeesAdd, employeesEdit };
};

export default useEmployeeChanges;
