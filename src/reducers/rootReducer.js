import userReducer from './userReducer';
import contactReducer from './contactReducer';
import companyReducer from './companyReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	usersData: userReducer,
	contactsData: contactReducer,
	companiesData: companyReducer,
});

export default rootReducer;
