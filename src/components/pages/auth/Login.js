import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {app} from "../../../firebase";
import { AuthContext } from "../../../Auth";
import { Button, Form, Header, Card } from 'semantic-ui-react'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <Card>
    <Card.Content>
    <Header as='h1'>Log in</Header>
    <Form onSubmit={handleLogin}>
    <Form.Field>
    <label>Email</label>
    <input name="email" type="email" placeholder="Email" />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input name="password" type="password" placeholder="Password" />
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <Button primary type='submit'>Log in</Button>
  </Form>
    </Card.Content>
    </Card>
    </>
  );
};

export default withRouter(Login);