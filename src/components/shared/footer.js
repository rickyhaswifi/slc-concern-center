import React, { Component } from 'react'
import {Segment, Container, Grid, List, Header} from 'semantic-ui-react'

class Footer extends Component {
  render() {
    return (
      <>
       <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Location' />
              <p>
              1235 West California Ave.<br/>
              Salt Lake City, UT 84104<br/>
              Phone: (801) 972-5708
              </p> 
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Service Hours' />
              <List link inverted>
                <List.Item>Mon: 6:00 - 8:00 PM</List.Item>
                <List.Item>Mon: 10:00 AM - 1:00 PM</List.Item>
                <List.Item>Wed: 10:00 AM - 1:00 PM</List.Item>
                <List.Item>Thu: 10:00 AM - 1:00 PM</List.Item>
                <List.Item>Sat: 9:00 AM - 12:00 PM</List.Item>
                <List.Item>Sun: Closed</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Links' />
              <List link inverted>
                <List.Item as='a' href='https://signup.com/client/invitation2/secure/607014175596004062/true#/invitation'>Volunteer Schedule</List.Item>
                <List.Item as='a' href='https://slba.org/concern-center'>Website</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h2' inverted>
              Salt Lake Baptist Association
              </Header>
              <p>
                Ron Clement: 801.380.6494<br/> 
                Diane Clement: 719.494.4160
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
      </>
    )
  }
}

export default Footer;
