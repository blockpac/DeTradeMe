import React, { Component } from 'react';
import {
	Person,
} from 'blockstack';
import {
	Card,
	Content
} from 'react-bulma-components'
//import './UserInfo.css'

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			person: {
				name() {
					return 'Anonymous';
				},
				avatarUrl() {
					return avatarFallbackImage;
				},
			},
		};
	}

	render() {
		const { userSession } = this.props;
		const { person } = this.state;
		return (
			!userSession.isSignInPending() ?
				<div className="admin-username">
					<Card>
						<Card.Content>
							<Content style={{ textAlign: 'center' }}>
								<div className="avatar-section">
									<img src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage} className="img-rounded avatar" id="avatar-image" alt="" />
								</div>
								<h1>Hello, {person.name() ? person.name() : 'Nameless Person'}!</h1>
							</Content>
						</Card.Content>
					</Card>
				</div> : null
		);
	}

	componentDidMount() {
		const { userSession } = this.props;
		this.setState({
			person: new Person(userSession.loadUserData().profile),
		});
	}
}
