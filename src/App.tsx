import React from 'react';
import './App.css';
import JobsContainer from './containers/JobsContainer'
import UserUpdate from './components/UserUpdate'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DashboardContainer from './containers/DashboardContainer'
import { Dimmer, Loader } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUsersList } from './actions/userActions'
import { getCompanyList } from './actions/companyActions'

interface AppProps {
	triggerGetCompanyList: () => void,
	triggerGetUsersList: () => void
	users: any[]
}

interface AppState {
	currentUser: any,
	userId: number
}

class App extends React.Component<AppProps, AppState> {
	state = {
		currentUser: null,
		userId: null,
	}

	getUsersInterval = async () => {
		const { currentUser } = this.state;
		const { triggerGetUsersList } = this.props;

		const interval = setInterval(async () => {
			if (!currentUser) {
				const users: any = await triggerGetUsersList();

				if (users && users.length > 0) {
					this.setState({ currentUser: users[0] })
					clearInterval(interval)
				}
			}
		}, 3000); // fetch data every 3 second until data arrives
	};

	async componentDidMount() {
		const { triggerGetUsersList } = this.props;

		const users: any = await triggerGetUsersList()
		console.log('users:', users)

		if (users && users.length > 0) {
			this.setState({ currentUser: users[0] })
		} else {
			await this.getUsersInterval()
		}
	}

	handleUpdateCurrentUser = (currentUserUpdated) => {
		this.setState({ currentUser: currentUserUpdated })
	}

	render() {
		let { currentUser } = this.state

		if (!currentUser) {
			return (
				<Dimmer active>
					<Loader />
				</Dimmer>
			)
		}

		return (
			<div className="App" >
				<Navbar />
				<Switch>
					<Route path='/signup' component={UserUpdate} />
					<Route path='/dashboard' render={(props) => <DashboardContainer currentUser={currentUser} />} />
					<Route path='/' render={(props) => {
						return <JobsContainer currentUser={currentUser} handleUpdateCurrentUser={this.handleUpdateCurrentUser} />
					}} />
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { users: state.usersData.users }
}

const mapDispatchToProps = dispatch => {
	return {
		triggerGetUsersList: () => dispatch(getUsersList()), // without using bindActionCreators
		triggerGetCompanyList: bindActionCreators(getCompanyList, dispatch) // using bindActionCreators
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
