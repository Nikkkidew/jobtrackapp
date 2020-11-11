const initialState = {
	contacts: [],
};

function contactReducer(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_CONTACTS_LIST': {
			const { contacts } = action.payload;
			return {
				...state,
				contacts: contacts,
			};
		}
		default:
			return state;
	}
}

export default contactReducer;
