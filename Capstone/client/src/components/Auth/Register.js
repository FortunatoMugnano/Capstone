import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../../API/userManager';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../App.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  submit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    register({
      username,
      email,
      password,
      confirmPassword,
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
      <Form onSubmit={this.submit}>
        <h1>Register</h1>
        <ul>
          {
            this.state.errors ? this.state.errors.map((message, i) => (
              <li key={i}>{message}</li>
            )) : null
          }
        </ul>
        <FormGroup>
          <Label htmlFor="username">
            Username
        </Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">
            Email
        </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
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
            required
            onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">
            Confirm Password
        </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            onChange={this.handleInputChange} />
        </FormGroup>
        <Button type="submit">Register</Button>
        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </Form>
      </>
    );
  }
}

export default withRouter(Register);