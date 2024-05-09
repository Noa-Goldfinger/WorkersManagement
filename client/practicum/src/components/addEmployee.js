import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate, useLocation } from "react-router-dom";
import * as Actions from "../store/action";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

const AddEmployeeForm = () => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
  const { fields, append } = useFieldArray({ control, name: 'positions' });
  const dispatch = useDispatch();
  const positions = useSelector(state => state.positions);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const isEditEmployeePage = location.pathname === "/editEmployee";

  const existingEmployeeData = location.state?.existingEmployeeData;

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState({
    name: '',
    id: ''
  });


  useEffect(() => {
    if (existingEmployeeData) {
      reset(existingEmployeeData);

      const selectedPositionsFromData = existingEmployeeData.positions.map(position => ({
        value: position.positionId,
        label: positions.find(pos => pos.id === position.positionId)?.name,
        ifManagerial: position.ifManagerial
      }));
      setSelectedPositions(selectedPositionsFromData);
    }
  }, [reset, positions, existingEmployeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here
  //   console.log(formData);
  //   handleClose(); // Closing the modal after form submission
  // };

  const handlePositionSelect = (selectedOptions) => {
    setSelectedPositions(selectedOptions);
    const newPositions = selectedOptions.filter(option => !selectedPositions.some(pos => pos.value === option.value));
    newPositions.forEach(option => {
      const index = fields?.length;
      append({ ifManagerial: option.ifManagerial, positionEntry: option.positionEntry });
    });
  };

  const compareDates = (positionEntry, startDate) => {
    return new Date(positionEntry) >= new Date(startDate);
  };

  const handleFormSubmit = (data) => {
    const { startWorkDate } = data;
    const { positions } = data;
    let isValid = true;

    positions.forEach(position => {
      if (!compareDates(position.positionEntry, startWorkDate)) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert('Entry to work date must be later than or equal to start work date');
      return;
    }

    onSubmit(data);
  };

  const onSubmit = (data) => {
    console.log(data);
    data.gender = Number(data.gender);
    data.dateBirth = `${data.dateBirth}T00:00:00.725Z`;
    data.startWorkDate = `${data.startWorkDate}T00:00:00.725Z`;
    data.employeePositions = selectedPositions.map(position => ({
      positionId: position.value,
      ifManagerial: position.ifManagerial
    }));
    const { positions } = data;
    data.employeePositions = positions.map((position, index) => ({
      ...position,
      ...data.employeePositions[index]
    }));

    const dataToAdd = {
      // "id":,
      "fName": data.fName,
      "lName": data.lName,
      "tz": data.tz,
      "startWorkDate": data.startWorkDate,
      "isActive": true,
      "dateBirth": data.dateBirth,
      "gender": data.gender,
      "employeePositions": data.employeePositions
    }
    delete data.positions;
    delete data["ifManagerial"];
    if (isEditEmployeePage) {
      // const dataToUpdate = { ...dataToAdd, id: data.id };
      const dataToUpdate = { ...data, isActive: true };////////////////////////////////////////////////האם לעשות סתם פעיל או באופןן מסןי=ויים רק אם נמצא?
      dispatch({ type: Actions.PUT_MEANTIME_EMPLOYEES, payload: dataToUpdate });
    }
    else {
      const dataToAddto = { ...dataToAdd, id: 0 };
      dispatch({ type: Actions.ADD_MEANTIME_EMPLOYEES, payload: dataToAddto });
    }
    //  ////////////////////////////////
    //  const k = useSelector(state => state.meantimeEmployees);

    //  console.log();
    //  ////////////////////////////////////////
    reset();
    navigate("/employees");
  };

  const onCancel = (data) => {
    navigate("/employees");
  }

  return (
    <div>
      {/* <TriggerButton type="button" onClick={handleOpen}>
        Open modal
      </TriggerButton> */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            {/* Registration Form */}
            {isEditEmployeePage ? (
              "Edit Employee"
            ) : (
              "Add Employee"
            )}

          </h2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <label htmlFor="fName">First Name</label>
              <input type="text" id="fName" {...register('fName', { required: 'First name is required' })} />
              {errors.fName && <p>{errors.fName.message}</p>}
            </div>
            <div>
              <label htmlFor="lName">Last Name</label>
              <input type="text" id="lName" {...register('lName', { required: 'Last name is required' })} />
              {errors.lName && <p>{errors.lName.message}</p>}
            </div>
            {/* <div>
        <label htmlFor="tz">Tz</label>
        <input type="text" id="tz" {...register('tz', { required: 'Tz is required' })} />
        {errors.tz && <p>{errors.tz.message}</p>}
      </div> */}
            <div>
              <label htmlFor="tz">Tz</label>
              <input
                type="text"
                id="tz"
                {...register('tz', {
                  required: 'Tz is required',
                  pattern: {
                    value: /^\d{9}$/,
                    message: 'Tz must be 9 digits long and contain only digits.'
                  }
                })}
              />
              {errors.tz && <p>{errors.tz.message}</p>}
            </div>
            <div>
              <label htmlFor="dateBirth">Date of Birth</label>
              <input type="date" id="dateBirth" {...register('dateBirth', { required: 'Date of birth is required' })} />
              {errors.dateBirth && <p>{errors.dateBirth.message}</p>}
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select id="gender" {...register('gender', { required: 'Gender is required' })}>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
              {errors.gender && <p>{errors.gender.message}</p>}
            </div>
            <div>
              <label htmlFor="positions">Positions</label>
              <Select id="positions" isMulti options={positions.map(position => ({ value: position.id, label: position.name, ifManagerial: position.ifManagerial }))} onChange={handlePositionSelect} value={selectedPositions} />
            </div>
            {selectedPositions.map((position, index) => (
              <div key={index}>
                <label>{position.label}</label>
                <input type="date" {...register(`positions[${index}].positionEntry`, { required: 'Entry date is required' })} defaultValue={positions[index]?.positionEntry || ''} />
                <label htmlFor={`ifManagerial-${index}`}> If Managerial</label>
                <input type="checkbox" id={`ifManagerial-${index}`} {...register(`positions[${index}].ifManagerial`)} defaultChecked={position.ifManagerial} />
              </div>
            ))}
            <div>
              <label htmlFor="startWorkDate">Start Work Date</label>
              <input type="date" id="startWorkDate" {...register('startWorkDate', { required: 'Start work date is required' })} />
              {errors.startWorkDate && <p>{errors.startWorkDate.message}</p>}
            </div>
            {isEditEmployeePage ? (
              <button type="submit">Edit Employee</button>
            ) : (
              <button type="submit">Add Employee</button>
            )}
            <button onClick={onCancel}>Cancel</button>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddEmployeeForm;
////////////////////////////////////// 
////////////////////////////////////// 
////////////////////////////////////// 
////////////////////////////////////// 
////////////////////////////////////// 
////////////////////////////////////// 
// return (


//   <form onSubmit={handleSubmit}>
//     <div className="form-group">
//       <label htmlFor="name">Name:</label>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />
//     </div>
//     <div className="form-group">
//       <label htmlFor="id">ID:</label>
//       <input
//         type="text"
//         id="id"
//         name="id"
//         value={formData.id}
//         onChange={handleChange}
//         required
//       />
//     </div>
//     <button type="submit">Submit</button>
//   </form>

// );
// }

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    label {
      font-weight: 600;
    }

    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      font-size: 0.875rem;
    }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);
