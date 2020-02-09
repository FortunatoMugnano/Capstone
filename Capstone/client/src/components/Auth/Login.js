import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { login } from '../../API/userManager';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../App.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  submit = (event) => {
    event.preventDefault();
    login({
      email: this.state.email,
      password: this.state.password,
    })
      .then((user) => {
        this.props.onLogin(user);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ errors: err.messages });
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <>
      <img className="logo" src="../../images/ENTER-Q-Logo.png" alt="logo" />
      <div className="wrapper">
      <Form className="login" onSubmit={this.submit}>
        <h1>Login</h1>
        <ul>
          {
            this.state.errors ? this.state.errors.map((message, i) => (
              <li key={i}>{message}</li>
            )) : null
          }
        </ul>
        <FormGroup>
          <Label htmlFor="email">
            Email
        </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">
            Password
        </Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={this.handleInputChange} />
        </FormGroup>
        <Button type="submit">Log in</Button>
        <p>
          Not yet a user? <Link to="/register">Sign up</Link>
        </p>
      </Form>
      </div>
      </>
    );
  }
}

export default withRouter(Login);