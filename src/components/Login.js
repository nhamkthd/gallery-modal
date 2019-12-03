import React, { useState } from "react";
import {Redirect} from "react-router-dom"
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import routesMap from "../common/routesMap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { actionLogin } from "../redux/user/action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin, shallowEqual);

  function handleLogin() {
    if (email.length === 0 || password.length === 0) {
      setHasError(true);
      return;
    }
    const data = {
      email,
      password,
    }
    setIsSubmitting(true);
    dispatch(actionLogin(data))

  }

  if (userLogin) {
    return <Redirect to={routesMap.home} />
  }

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Header as="h2" color="blue" textAlign="center">
              Log-in to your account
          </Header>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button color="blue" fluid size="medium" loading={isSubmitting} onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
