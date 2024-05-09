import * as Actions from './action'

const initialState = {
    meantimeEmployees: [],
    meantimeEmployeesToDell: [],
    meantimeEmployeesToAdd: [],
    meantimeEmployeesToEdit: [],
    positions: [],
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_MEANTIME_EMPLOYEES: {
            return { ...state, meantimeEmployees: action.payload, empLen: action.payload?.length }
        }
        case Actions.ADD_MEANTIME_EMPLOYEES: {
            const meantimeEmployeesToAdd = [...state.meantimeEmployeesToAdd];
            if (!!state.meantimeEmployees)
                action.payload.id = state.meantimeEmployees[state.meantimeEmployees.length - 1].id + 1;
            else action.payload.id = 0;
            meantimeEmployeesToAdd.push(action.payload);
            const meantimeEmployees = [...state.meantimeEmployees];
            meantimeEmployees.push(action.payload);
            return { ...state, meantimeEmployeesToAdd, meantimeEmployees }
        }
        case Actions.DELL_MEANTIME_EMPLOYEES: {
            const meantimeEmployeesToDell = [...state.meantimeEmployeesToDell];
            meantimeEmployeesToDell.push(action.payload);
            return { ...state, meantimeEmployeesToDell }
        }
        case Actions.PUT_MEANTIME_EMPLOYEES: {
            const meantimeEmployeesToEdit = [...state.meantimeEmployeesToEdit];
            meantimeEmployeesToEdit.push(action.payload);
            const meantimeEmployees = [...state.meantimeEmployees];
            const findIndex = meantimeEmployees.findIndex(x => x.id === action.payload.id);
            meantimeEmployees[findIndex] = action.payload;
            return { ...state, meantimeEmployeesToEdit, meantimeEmployees }
        }
        case Actions.SET_POSITIONS: {
            return { ...state, positions: action.payload }
        }
        default: return { ...state }
    }
}