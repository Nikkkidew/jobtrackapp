import axios from 'axios';

export const getContactsList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/contacts');
			// const json = await response.json();
			const contacts = response.data;

			dispatch({ type: 'FETCH_CONTACTS_LIST', payload: { contacts: contacts } });
		} catch (err) {
			console.error('err: ', err.message);
		}
	};
};
