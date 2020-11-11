import React from 'react'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import { Job, User } from '../utils/helpers'
import axios from 'axios'

interface JobFormProps {
	currentUser: User
	handleUpdateCurrentUser: (user) => void
}

interface JobFormState {
	id: string,
	title: string,
	salary: string,
	rating: string,
	location: string,
	description: string,
	companyName: string,
	companySize: string,
	industry: string,
	status: string,
	[x: string]: string,

}
class JobForm extends React.Component<JobFormProps, JobFormState> {
	state = {
		id: '',
		title: '',
		salary: '',
		rating: '',
		location: '',
		description: '',
		companyName: '',
		companySize: '',
		industry: '',
		status: '',
	}

	handleChange = (event, value) => {
		console.log('value:', value)

		this.setState({
			[value.name]: value.value
		})
	}

	handleSubmitForm = async () => {
		const { currentUser, handleUpdateCurrentUser } = this.props

		const { id, title, salary, rating, location, description, companyName, companySize, industry, status } = this.state

		const newJob = {
			id: parseInt(id),
			title,
			salary: parseInt(salary),
			rating: parseInt(rating),
			location,
			description,
			companyName,
			companySize: parseInt(companySize),
			industry,
			status,
		}

		const jobsUpdated = [...currentUser.jobs, newJob]

		try {
			const response = await axios.patch('http://localhost:3001/users/1', { jobs: jobsUpdated })
			const currentUserUpdated = response.data;

			handleUpdateCurrentUser(currentUserUpdated)
		} catch (error) {
			console.log(error)
		}
	} //




	render() {
		const { id, title, salary, rating, location, description, companyName, companySize, industry, status } = this.state

		return (

			<Form onSubmit={this.handleSubmitForm}>
				<Form.Field>
					<label>Company Name</label>
					<Form.Input onChange={this.handleChange} name='companyName' value={companyName} placeholder='companyName' />
				</Form.Field>
				<Form.Field>
					<label>Title</label>
					<Form.Input onChange={this.handleChange} name='title' value={title} placeholder='title' />
				</Form.Field>
				<Form.Field>
					<label>Salary</label>
					<Form.Input onChange={this.handleChange} name='salary' value={salary} placeholder='salary' />
				</Form.Field>
				<Form.Field>
					<label>Location</label>
					<Form.Input onChange={this.handleChange} name='location' value={location} placeholder='location' />
				</Form.Field>
				<Form.Field>
					<label>Rating</label>
					<Form.Input onChange={this.handleChange} name='rating' value={rating} placeholder='rating' />
				</Form.Field>
				<Form.Field>
					<label>Description</label>
					<Form.Input onChange={this.handleChange} name='description' value={description} placeholder='description' />
				</Form.Field>
				<Form.Field>
					<label>Status</label>
					<Form.Input onChange={this.handleChange} name='status' value={status} placeholder='status' />
				</Form.Field>
				<Form.Field>
					<label>Company Size</label>
					<Form.Input onChange={this.handleChange} name='companySize' value={companySize} placeholder='companySize' />
				</Form.Field>
				<Form.Field>
					<label>ID</label>
					<Form.Input onChange={this.handleChange} name='id' value={id} placeholder='id' />
				</Form.Field>
				<Form.Field>
					<label>Industry</label>
					<Form.Input onChange={this.handleChange} name='industry' value={industry} placeholder='industry' />
				</Form.Field>

				<Button type='submit'>Submit</Button>
			</Form>


		)
	}

}
export default JobForm