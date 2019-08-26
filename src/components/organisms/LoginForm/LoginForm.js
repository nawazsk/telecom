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
    axios({
      url: '',
      method: 'post',
      headers: {
        Accept: 'application/javascript'
      },
      data: values
    })
      .then(response => {
        console.log('response', response);
      })
      .catch(error => console.log(error));
  }

  render() {
    const locationFormProps = {
      initialValues: {
        emailField: '',
        passwordField: ''
      },
      action: '/',
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
      className: 'form-group row',
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
      className: 'form-group row',
      fieldProps
    };
    // render elements
    return (
      <div className={this.props.className}>
        <Form {...locationFormProps} bindFormikSubmit={this.bindFormikSubmit}>
          <Heading HeadingType="h4">Please Login</Heading>

          <Form.Input {...emailFieldInputProps} />

          <Form.Input {...passwordFieldInputProps} />

          <Button type="submit" className="btn btn-primary">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

LoginForm.defaultProps = {
  className: 'row justify-content-space-around'
};

export default LoginForm;
