import React, { Component } from 'react'
import Logo from './images/cclogo.jpg'
import { Menu } from 'semantic-ui-react'
import {app} from '../../firebase'

class Nav extends Component {
  render() {
    return (
      <Menu>
        <Menu.Header href='/'>
        <img src={Logo} style={{width:'80px'}} alt='logo'/>
        </Menu.Header>

        <Menu.Item
        name='Home'
        href='/'
        >
          Home
        </Menu.Item>
        <Menu.Item
        name='Clients'
        href='/client'
        >
        Clients
        </Menu.Item>
        <Menu.Item
        name='Volunteers'
        href='/volunteer'
        >
          Volunteers
        </Menu.Item>
        <Menu.Item
        name='Vendor'
        href='/vendor'
        >
          Vendors
        </Menu.Item>

        <Menu.Menu position='right'>
        <Menu.Item
        onClick={()=> app.auth().signOut()}
        >
          Logout
        </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Nav