import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Job } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { getContactsList } from '../actions/contactActions'
import { connect } from 'react-redux'

interface JobCardProps {
	job: Job
	handleClickJobCard: (job) => void
	starRating: (jobRating) => string
	colorRating: (jobRating) => any
	handleDelete: (job) => any
}

class JobCard extends React.Component<JobCardProps, null> {
	render() {
		const { job, handleClickJobCard, starRating, colorRating, handleDelete } = this.props

		return <Card color={colorRating(job.rating)} onClick={() => handleClickJobCard(job)}>

			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
				/>
				<Card.Header>{job.companyName} <span role='img' aria-label='star'>{starRating(job.rating)}</span></Card.Header>
				<Card.Meta>Status: {job.status}</Card.Meta>
				<Card.Description className={'delete-button'}>
					Salary: ${job.salary}
					<button onClick={() => handleDelete(job.id)}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</Card.Description>
			</Card.Content>
		</Card>
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contactsData.contacts
	}
}

const mapDispatchToProps = (dispatch) => ({
	triggerGetContactsList: () => dispatch(getContactsList())
});

export default connect(mapStateToProps, mapDispatchToProps)(JobCard)


