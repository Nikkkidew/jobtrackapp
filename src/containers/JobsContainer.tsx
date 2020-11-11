import React from 'react'
import JobCard from '../components/JobCard'
import JobRow from '../components/JobRow'
import { Card, Modal, Button } from 'semantic-ui-react'
import { Job, User } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import JobForm from '../components/JobForm'
import axios from 'axios'

interface JobsContainerProps {
	currentUser: User
	handleUpdateCurrentUser: (user: User) => void
}

interface JobsContainerState {
	//Filtered States:
	isSortBySalary: boolean
	isSortByRating: boolean
	isSortByLocation: boolean
	isSortByRecent: boolean
	//jobCard Clicked status
	jobsClicked: any
}

class JobsContainer extends React.Component<JobsContainerProps, JobsContainerState> {
	state = {
		isSortBySalary: false,
		isSortByRating: false,
		isSortByLocation: false,
		isSortByRecent: false,
		jobsClicked: [],
	}

	handleDelete = async (jobId) => {
		const { currentUser, handleUpdateCurrentUser } = this.props

		const jobsUpdated = currentUser.jobs.filter(job => job.id !== jobId)

		try {
			const response = await axios.patch(`http://localhost:3001/users/1`, { jobs: jobsUpdated })

			const currentUserUpdated: User = response.data;
			console.log(response)

			handleUpdateCurrentUser(currentUserUpdated)

		} catch (error) {
			console.log(error)
		}

	}


	starRating = (jobRating): string => {
		let stars = ''
		for (let i = 0; i < jobRating; i++) {
			stars = stars + '⭐️'
		}

		return stars
	}

	colorRating = (jobRating) => {
		if (jobRating === 1) {
			return 'red'
		}
		if (jobRating === 2) {
			return 'orange'
		}
		if (jobRating === 3) {
			return 'yellow'
		}
		if (jobRating === 4) {
			return 'blue'
		}
		if (jobRating === 5) {
			return 'green'
		}

	}

	toggleSort = (sortType) => {
		const { isSortBySalary, isSortByRating, isSortByLocation, isSortByRecent } = this.state

		if (sortType === 'salary') {
			this.setState({ isSortBySalary: !isSortBySalary, isSortByRating: false, isSortByLocation: false, isSortByRecent: false })
		}

		if (sortType === 'rating') {
			this.setState({ isSortByRating: !isSortByRating, isSortBySalary: false, isSortByLocation: false, isSortByRecent: false })
		}

		if (sortType === 'location') {
			this.setState({ isSortByLocation: !isSortByLocation, isSortByRating: false, isSortBySalary: false, isSortByRecent: false })
		}

		if (sortType === 'recent') {
			this.setState({ isSortByRecent: !isSortByRecent, isSortByRating: false, isSortBySalary: false, isSortByLocation: false })
		}
	}

	handleClickJobRow = (job: Job): boolean | void => {
		const { jobsClicked } = this.state;

		const updatedJobsClicked = [...jobsClicked].filter(jobId => { // [1, 2]
			if (job.id === jobId) {
				return false
			}
			return true
		})
		this.setState({ jobsClicked: updatedJobsClicked })
	}

	handleClickJobCard = (job: Job) => {

		const { jobsClicked } = this.state
		const updatedJobsClicked = [...jobsClicked, job.id]
		this.setState({ jobsClicked: updatedJobsClicked })
	}

	handleClickHamburger = () => {
		const { currentUser: { jobs } } = this.props

		const jobsIds = jobs.map(job => {
			return job.id
		})

		this.setState({ jobsClicked: jobsIds })
	}

	handleClickReverseHamburger = () => {
		const jobsIds = []

		this.setState({ jobsClicked: jobsIds })
	}


	toggleClick = (isHamburger) => {
		if (isHamburger === true) {
			const { currentUser: { jobs } } = this.props

			const jobsIds = jobs.map(job => {
				return job.id
			})

			this.setState({ jobsClicked: jobsIds })
		} else {
			const jobsIds = []

			this.setState({ jobsClicked: jobsIds })
		}
	}


	render() {
		const { currentUser, currentUser: { jobs }, handleUpdateCurrentUser } = this.props
		const { isSortBySalary, isSortByLocation, isSortByRating, isSortByRecent } = this.state;
		const { jobsClicked } = this.state;

		let jobsToRender = [...jobs]

		let sortType = ''

		if (isSortBySalary) {
			sortType = 'salary'
		}

		if (isSortByRating) {
			sortType = 'rating'
		}

		if (isSortByLocation) {
			sortType = 'location'
		}

		if (isSortBySalary || isSortByRating) {
			jobsToRender = [...jobs].sort((jobA, jobB) => {
				return jobB[sortType] - jobA[sortType]
			})

		}
		if (isSortByLocation) {
			jobsToRender = [...jobs].sort((jobA, jobB) => {
				return jobA[sortType].localeCompare(jobB[sortType])
			})
		}

		if (isSortByRecent) {
			jobsToRender = [...jobs].reverse()
		}

		return (
			<div>
				<span className={'add-job-button'}>
					<Modal trigger={<Button>Add New Job</Button>}><Modal.Content><JobForm currentUser={currentUser} handleUpdateCurrentUser={handleUpdateCurrentUser} /></Modal.Content></Modal>
				</span>
				<div className={'job-container'}>

					<Button.Group className={'sort-button-group'}>
						<Button onClick={() => this.toggleSort('salary')}>Salary</Button>
						<Button onClick={() => this.toggleSort('rating')}>Best Rated</Button>
						<Button onClick={() => this.toggleSort('location')}>Location</Button>
						<Button onClick={() => this.toggleSort('recent')}>Recent</Button>
						<Button onClick={() => this.toggleClick(true)}><FontAwesomeIcon icon={faBars} /></Button>
						<Button onClick={() => this.toggleClick(false)}><FontAwesomeIcon icon={faTh} /></Button>
					</Button.Group>

					<Card.Group>
						{jobsToRender.map(job => {

							if (jobsClicked.includes(job.id) === true) {
								return <JobRow key={job.id} job={job} handleClickJobRow={this.handleClickJobRow} starRating={this.starRating} colorRating={this.colorRating} handleDelete={this.handleDelete} />
							}
							return <JobCard key={job.id} job={job} handleClickJobCard={this.handleClickJobCard} starRating={this.starRating} colorRating={this.colorRating} handleDelete={this.handleDelete} />
						})}
					</Card.Group>
				</div>
			</div >

		)
	}
}

export default JobsContainer
