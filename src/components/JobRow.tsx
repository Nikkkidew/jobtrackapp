import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Job } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface JobRowProps {
	job: Job
	handleClickJobRow: (job) => void
	starRating: (jobRating) => string
	colorRating: (jobRating) => any
	handleDelete: (job) => any
}

class JobRow extends React.Component<JobRowProps, null> {
	render() {
		//we'll need this to render the clicked button from job card here
		const { job, handleClickJobRow, starRating, colorRating, handleDelete } = this.props
		return <Card color={colorRating(job.rating)} fluid onClick={() => handleClickJobRow(job)} >
			<Card.Content>
				<Card.Header>
					<div className='job-info'>
						<span className='company-name'>{job.companyName}<span role='img' aria-label='star'>  {starRating(job.rating)}
							<Card.Meta>Status: {job.status} </Card.Meta></span></span>
						<span className='job-details'>
							Salary: ${job.salary}
							<br /> Size: {job.companySize}
							<br /> Industry: {job.industry}</span>
						<Image
							floated='right'
							size='tiny'
							src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
						/>
					</div>
				</Card.Header>
				<Card.Description>
					<br /> Description: {job.description}</Card.Description>
			</Card.Content>
			<button onClick={() => handleDelete(job.id)}>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</Card>
	}
}

export default JobRow
