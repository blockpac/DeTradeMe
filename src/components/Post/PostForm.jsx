import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import {
	Control,
	Field,
	Input,
	Label,
	Textarea,
	Select
} from 'react-bulma-components/lib/components/form'
import {
	Button,
	Card,
	Content
} from 'react-bulma-components'
import { POST_FILENAME } from 'utils/constants'
import uuid from 'uuid'

class PostForm extends Component {
	constructor(props) {
		super(props)

		const { post = {} } = props

		this.state = {
			title: post.title || '', // returns an edited post or starting a new post
			description: post.description || '', // returns an edited post or starting a new post
			price: post.price || '', // returns an edited post or starting a new post
			currency: post.currency || '', // returns an edited post or starting a new post
			posts: []
		}
	}

	static propTypes = {
		userSession: PropTypes.object.isRequired,
		username: PropTypes.string.isRequired,
		post: PropTypes.object,
		type: PropTypes.string.isRequired
	}

	componentDidMount() {
		this.loadPosts()
	}

	// load posts
	loadPosts = async () => {
		const { userSession } = this.props
		const options = { decrypt: false }

		const result = await userSession.getFile(POST_FILENAME, options)

		if (result) {
			return this.setState({ posts: JSON.parse(result) })
		}

		return null
	}

	editPost = async () => {
		const options = { encrypt: false }
		const { title, description, price, currency, posts } = this.state
		const { history, userSession, username, post } = this.props

		// for posts.json
		const params = {
			id: post.id,
			title,
		}


		// for post-${post-id}.json
		const detailParams = {
			...params,
			description,
			price,
			currency
		}

		const editedPostsForIndex = _.map(posts, (p) => {
			if (p.id === post.id) {
				return params
			}

			return p
		})

		try {
			await userSession.putFile(POST_FILENAME, JSON.stringify(editedPostsForIndex), options)

		} catch (e) {
			console.log(e.message)
		}

		try {
			await userSession.putFile(`post-${post.id}.json`, JSON.stringify(detailParams), options)

			this.setState({
				title: '',
				description: '',
				price: '',
				currency: ''
			}, () => {
				history.push(`/admin/${username}/posts`)
			})
		} catch (e) {
			console.log(e.message)
		}
	}

	createPost = async () => {
		const options = { encrypt: false }
		const { title, description, price, currency, posts } = this.state
		const { history, userSession, username } = this.props
		const id = uuid.v4()

		// for post.json
		const params = {
			id,
			title,
		}

		// for post-${post-id}.json
		const detailParams = {
			...params,
			description,
			price,
			currency
		}

		try {
			await userSession.putFile(POST_FILENAME, JSON.stringify([...posts, params]), options)
		} catch (e) {
			console.log(e.message)
		}

		try {
			await userSession.putFile(`post-${id}.json`, JSON.stringify(detailParams), options)
			this.setState({
				title: '',
				description: '',
				price: '',
				currency: ''

			}, () => history.push(`/admin/${username}/posts`))
		} catch (e) {
			console.log(e.message)
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault()

		const { type } = this.props

		return type === 'edit' ? this.editPost() : this.createPost()
	}

	navigateToProfile = () => {
		const { history, username } = this.props

		history.push(`/admin/${username}`)
	}

	render() {
		return (
			<Card className="card-form">
				<Card.Content>
					<Content>
						<form onSubmit={this.onSubmit} className="post-form">
							<Field>
								<Label>Name</Label>
								<Control>
									<Input
										name="title"
										onChange={this.onChange}
										placeholder="Name of the Listing"
										value={this.state.title}
									/>
								</Control>
							</Field>
							<Field>
								<Label>Description</Label>
								<Control>
									<Textarea
										name="description"
										onChange={this.onChange}
										placeholder="Description of your Listing!"
										rows={5}
										value={this.state.description}
									/>
								</Control>
							</Field>
							<Field>
								<Label>Price</Label>
								<Control>
									<Input
										name="price"
										onChange={this.onChange}
										placeholder="$$$"
										value={this.state.price}
									/>
								</Control>
							</Field>
							<Field>
								<Label>Currency</Label>
								<Control>
									<Select
										name="currency"
										onChange={this.onChange}
										value={this.state.currency}
									>
										<option disabled hidden value=''></option>
										<option value="NZD">NZD</option>
										<option value="AUD">AUD</option>
										<option value="USD">USD</option>
										<option value="EUR">EUR</option>
									</Select>
								</Control>
							</Field>
							<Field>
								<Control>
									<Button color="info">Upload Photo</Button>
								</Control>
							</Field>
							<Field kind="group">
								<Control>
									<Button
										onClick={this.navigateToProfile}
									>
										Cancel</Button>
								</Control>
								<Control>
									<Button
										color="dark"
										type="submit"
									>
										Submit
                  </Button>
								</Control>
							</Field>
						</form>
					</Content>
				</Card.Content>
			</Card>
		)
	}
}

export default withRouter(PostForm)