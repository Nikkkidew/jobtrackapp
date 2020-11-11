import axios from 'axios';

export const getUsersList = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('http://localhost:3001/users');
			const users = response.data;	
			dispatch({ type: 'FETCH_USERS_LIST', payload: { users: users } });

			return users;
		} catch (err) {
			console.error('err: ', err.message);
		}
	};
};

export const findUserByID = (userId) => {
	return async (dispatch, getState) => {
		const { users } = getState();
		const currentUser = users.find((user) => user.id === userId);
		dispatch({
			type: 'FIND_USER',
			payload: {
				foundUser: currentUser,
			},
		});
	};
};

export const deleteUsers = () => {
	return async (dispatch) => {
		dispatch({
			type: 'DELETE_USERS',
			payload: {
				users: [],
			},
		});
	};
};
