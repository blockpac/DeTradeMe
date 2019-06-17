import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    loading: false
  }

  handleSignIn = (e) => {
    const { userSession } = this.props
    e.preventDefault()
    userSession.redirectToSignIn()
    this.setState({ loading: true })
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <section class="hero is-link is-bold is-fullheight">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Blockstack DeTradeMe</h1>
              <h2 class="subtitle">
                A decentralized MarketPlace app built on{" "}
                <u>
                  <a
                    href="https://blockstack.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blockstack
                </a>
                </u>
              </h2>
              <button
                type="button" class="btn btn-light btn-lg"
                onClick={this.handleSignIn}
              >
                Sign in with Blockstack
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
