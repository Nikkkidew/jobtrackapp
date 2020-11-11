import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'

interface UserUpdateState {
	email: string

}
class UserUpdate extends React.Component<{}, UserUpdateState> {
	state = {
		email: ''
	}

	handleChange = (event, value) => {
		console.log('value', value)
		this.setState({
			email: value.value
		})
	}

	addNewUser = async () => {
		const { email } = this.state

		const newUser = {
			email,
			jobs: []
		}

		try {
			await axios.post('http://localhost:3001/users/', newUser)

		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { email } = this.state

		return (
			<Form onSubmit={this.addNewUser}>
				<Form.Field>
					<label>User Email</label>
					<Form.Input onChange={this.handleChange} name='email' value={email} placeholder='email' />
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>

		)
	}
}
export default UserUpdate