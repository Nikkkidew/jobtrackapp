import React from 'react';
import JobsDnd from './JobsDnd';

class DashboardContainer extends React.Component {
	render() {
		const {
			currentUser: { jobs },
		} = this.props; //receive
		return (
			<div className="dashboard-container">
				<h3>Job Dashboard</h3>
				<header>
					<p>Phone Interview</p>
					<p>In Person Interview</p>
					<p>Technical Interview</p>
					<p>Job Offers</p>
				</header>
				<JobsDnd jobs={jobs} />; {/*passing */}
			</div>
		);
	}
}

export default DashboardContainer;
