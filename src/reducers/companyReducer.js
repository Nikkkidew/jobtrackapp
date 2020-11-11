const initialState = {
	companies: [],
};

function companyReducer(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_COMPANIES_LIST': {
			const { companies } = action.payload;
			return {
				...state,
				companies: companies,
			};
		}
		default:
			return state;
	}
}

export default companyReducer;
