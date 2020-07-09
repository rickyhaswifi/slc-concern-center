import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Card, Header, Image, Grid, } from 'semantic-ui-react'
import ClientImage from '../shared/images/client.png'
import VolunteerImage from '../shared/images/volunteers.png'
import VendorsImage from '../shared/images/vendors.jpg'

class HomePage extends Component {
  render() {
    return (
      <>
        <Header as='h1'>Concern Center Dashboard</Header>
      <p>
      The Concern Center is a food pantry and clothes closet that serves families in need on a monthly or emergency basis.
      </p>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
         
          <Card raised color='teal' fluid href='/client'>
          <Image src={ClientImage} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Client Management</Card.Header>
            <Card.Meta>
              <span className='date'>Manage CC Clients</span>
            </Card.Meta>
            <Card.Description>
              Concern Center visitor log
              
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Link to='/client'>Client Management</Link>
          </Card.Content>
        </Card>
        
        </Grid.Column>

          <Grid.Column>
          <Card raised color='blue' fluid href='/volunteer'>
          <Image src={VolunteerImage} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Volunteer Management</Card.Header>
            <Card.Meta>
              <span className='date'>Manage CC Volunteers</span>
            </Card.Meta>
            <Card.Description>
              Concern Center volunteer log
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Link to='/volunteer'>Volunteer Management</Link>
          </Card.Content>
        </Card>
        </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
         
          <Card raised color='orange' fluid href='/vendor'>
          <Image src={VendorsImage} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Vendor Management</Card.Header>
            <Card.Meta>
              <span className='date'>Manage CC Vendors</span>
            </Card.Meta>
            <Card.Description>
              Concern Center Vendors
              
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Link to='/client'>Client Management</Link>
          </Card.Content>
        </Card>
        
        </Grid.Column>

          <Grid.Column>
          <Card raised color='purple' fluid href='/resources'>
          <Image src={VolunteerImage} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Volunteer Management</Card.Header>
            <Card.Meta>
              <span className='date'>Manage CC Volunteers</span>
            </Card.Meta>
            <Card.Description>
              Concern Center volunteer log
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Link to='/volunteer'>Volunteer Management</Link>
          </Card.Content>
        </Card>
        </Grid.Column>
        </Grid.Row>
      </Grid>
      
      </>
    )
  }

}

export default HomePage
