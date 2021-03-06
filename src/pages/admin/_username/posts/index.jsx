import React, { Component } from 'react'
import {
	Card,
	Content
} from 'react-bulma-components'
import { withRouter } from 'react-router-dom'
import { POST_FILENAME } from 'utils/constants'
import { MyContext } from 'components/User/UserProvider'
import PostsTable from 'components/Post/PostsTable'
import _ from 'lodash'

class AdminPosts extends Component {
	state = {
		posts: []
	}

	componentDidMount() {
		this.loadPosts()
	}

	loadPosts = async () => {
		const { userSession } = this.context.state.currentUser
		const options = { decrypt: false }

		try {
			const result = await userSession.getFile(POST_FILENAME, options)

			if (!result) {
				throw new Error('Posts File does not exist')
			}

			return this.setState({ posts: JSON.parse(result) })
		} catch (e) {
			console.log(e.message)
		}
	}

	deletePost = async (postId) => {
		const { userSession } = this.context.state.currentUser
		const { posts } = this.state
		const options = { encrypt: false }

		const filteredPosts = _.filter(posts, (post) => post.id !== postId)

		try {
			await userSession.putFile(POST_FILENAME, JSON.stringify(filteredPosts), options)
		} catch (e) {
			console.log(e.message)
		}

		try {
			await userSession.putFile(`post-${postId}.json`, '', options)
			this.setState({ posts: filteredPosts })
		} catch (e) {
			console.log(e.message)
		}
	}


	render() {
		const { posts } = this.state
		const { username } = this.context.state.currentUser

		return (
			<div className="post-table">
				<Card>
					<Card.Content>
						<Content>
							<PostsTable
								posts={posts}
								username={username}
								deletePost={this.deletePost}
							/>
						</Content>
					</Card.Content>
				</Card>
			</div>
		)
	}
}

export default withRouter(AdminPosts)
AdminPosts.contextType = MyContext