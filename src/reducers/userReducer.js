const initialState = {
	users: [],
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_USERS_LIST': {
			const { users } = action.payload;
			return {
				...state,
				users: users,
			};
		}

		case 'DELETE_USERS': {
			const { users } = action.payload;
			return {
				...state,
				users: users,
			};
		}
		case 'FIND_USER': {
			const { foundUser } = action.payload;
			return {
				...state,
				foundUser: foundUser,
			};
		}
		default:
			return state;
	}
}

export default userReducer;
