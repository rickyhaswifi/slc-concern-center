import React, { Component } from 'react'
import {Button, Image} from 'semantic-ui-react'
import Cat from '../shared/images/cat.jpg'

export default class NoMatch extends Component {
  render() {
    return (
      <>
      <h1>
        404 Page Not Found
      </h1>
      <h2>
        You did find the alley cat though...
      </h2>

      <Button
      href='/'
      color={'blue'}
      >
        Return Home
      </Button>
      <p />
      <Image
      src={Cat}
      />


        
      </>
    )
  }
}
