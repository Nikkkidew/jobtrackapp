import axios from 'axios';

//comments 123
export const getCompanyList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/companies');
			// const json = await response.json();
			const companies = response.data;

			dispatch({
				type: 'FETCH_COMPANIES_LIST',
				payload: { companies: companies },
			});
		} catch (err) {
			console.log(err);
		}
	};
};
