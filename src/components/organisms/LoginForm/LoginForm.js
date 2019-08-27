/**.
 * @author shivam
 */
// @flow
import React, { Component } from 'react';
import Form from '../../molecules/Form';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import axios from 'axios';
type Props = {
  className?: string
};

class LoginForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  submitLoginForm(values) {
    console.log('values', values);
    const { emailField: username, passwordField: password } = values;
    axios({
      url: 'http://10.202.239.78:8080/auth-api/authenticate',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        username,
        password
      })
    })
      .then(response => {
        console.log('response', response);
      })
      .catch(error => console.log(error));
  }

  render() {
    const loginFormProps = {
      initialValues: {
        emailField: '',
        passwordField: ''
      },
      action: 'http://10.202.239.78:8080/auth-api/authenticate',
      method: 'post',
      handleSubmit: this.submitLoginForm,
      validationSchema: ['emailField', 'passwordField']
    };
    const fieldProps = {
      className: 'form-control'
    };
    /* this field is email */
    const emailFieldInputProps = {
      type: 'text',
      name: 'emailField',
      label: 'Email',
      id: 'loginEmail',
      ariaLabel: 'enter email',
      autoComplete: 'off',
      className: 'form-group',
      fieldProps
    };
    /* this field is Password */
    const passwordFieldInputProps = {
      type: 'password',
      name: 'passwordField',
      label: 'Password',
      id: 'loginPassword',
      ariaLabel: 'enter password',
      autoComplete: 'off',
      className: 'form-group',
      fieldProps
    };
    // render elements
    return (
      <Form {...loginFormProps}>
        <div className={this.props.className}>
          <Heading HeadingType="h4">Please Login</Heading>

          <Form.Input {...emailFieldInputProps} />

          <Form.Input {...passwordFieldInputProps} />

          <Button type="submit" className="btn btn-primary btnSubmit">
            Login
          </Button>
        </div>
      </Form>
    );
  }
}

LoginForm.defaultProps = {
  className: 'loginModule row pd1'
};

export default LoginForm;
