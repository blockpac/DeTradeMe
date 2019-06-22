import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Heading, Content, Image, Columns } from 'react-bulma-components'

class PostDetailView extends Component {
	state = {
		post: {}
	}
	static propTypes = {
		userSession: PropTypes.object.isRequired,
		username: PropTypes.string.isRequired,
		match: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	componentDidMount = async () => {
		const { userSession, match, history, username } = this.props
		const options = { decrypt: false, username }

		const result = await userSession.getFile(`post-${match.params.post_id}.json`, options)

		if (result) {
			return this.setState({ post: JSON.parse(result) })
		}

		// admin/username/posts
		return history.push(`/admin/${username}/posts`)
		//return null
	}
	render() {
		const { post } = this.state

		return (
			<div className="post-view">
				<Card>
					<Card.Content>
						<Content>
							<Columns mobile>
								<Columns.Column>
									<div style={{ width: 640 }}>
										<Image src="http://bulma.io/images/placeholders/640x480.png" size="3by2" />
									</div>
								</Columns.Column>
								<Columns.Column>
									<Heading renderAs="h1">{post.title}</Heading>
									<Heading renderAs="h3">Description</Heading>
									<p>{post.description}</p>
									<Heading renderAs="h3">Price</Heading>
									<p>{post.currency} {post.price}</p>
								</Columns.Column>
							</Columns>
						</Content>
					</Card.Content>
				</Card>
			</div>
		)
	}
}

export default withRouter(PostDetailView)