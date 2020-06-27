import React from 'react';
// ASSETS
import './App.css';
import Nav from './components/shared/nav';
import { Container } from 'semantic-ui-react'
import {Switch, Route } from 'react-router-dom';

// PAGES
import Clients from './components/clients/Clients';
import ClientDetail from './components/clients/ClientDetail'
import ClientAddForm from './components/clients/ClientAddForm';

import Volunteers from './components/volunteers/Volunteers'
import VolunteerDetail from './components/volunteers/VolunteerDetail'
import VolunteersAddForm from './components/volunteers/VolunteerAddForm';

import Vendors from './components/vendors/Vendors'
import VendorDetail from './components/vendors/VendorDetail'
import VendorsAddForm from './components/vendors/VendorAddForm'

import HomePage from './components/pages';
import NoMatch from './components/pages/NoMatch';

// AUTH
import Login from './components/pages/auth/Login'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Container fluid>
          <Container>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/client" component={Clients} />
              <PrivateRoute
                exact
                path="/client/form"
                component={ClientAddForm}
              />

              <PrivateRoute exact path="/volunteer" component={Volunteers} />
              <PrivateRoute
                exact
                path="/volunteer/form"
                component={VolunteersAddForm}
              />

              <PrivateRoute exact path="/vendor" component={Vendors} />
              <PrivateRoute
                exact
                path="/vendor/form"
                component={VendorsAddForm}
              />
              <PrivateRoute exact path="/volunteer/:id" component={VolunteerDetail} />
              <PrivateRoute exact path="/client/:id" component={ClientDetail} />
              <PrivateRoute exact path="/vendor/:id" component={VendorDetail} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          </Container>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;


