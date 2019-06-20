import React, { Component } from 'react'
import Loader from 'components/Loader'
import { Button } from 'react-bulma-components'

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
        {
          loading ? <Loader /> :
            <section class="hero is-link is-bold is-fullheight">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">Blockstack DeTrade Me</h1>
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
                  <Button class="button is-large is-light"
                    onClick={this.handleSignIn}
                  >
                    Sign in with Blockstack
                  </Button>
                </div>
              </div>
            </section>
        }
      </div>
    )
  }
}
