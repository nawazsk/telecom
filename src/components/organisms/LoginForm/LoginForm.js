/**.
 * @author shivam
 */
// @flow
import React, { Component } from 'react';
import Form from '../../molecules/Form';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import AjaxFactoryUtil from '../../../utils/AjaxFactoryUtil';
import Cookies from 'universal-cookie';

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
    const options = {
      url: 'http://10.202.239.78:8086/login',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        username,
        password
      }
    };
    AjaxFactoryUtil.triggerServerRequest(options)
      .then(({ body: { data, ajaxRequestStatus } }) => {
        if (ajaxRequestStatus === 'SUCCESS') {
          const { token } = data;
          const cookies = new Cookies();
          const minutes = 4;
          const date = new Date();
          date.setTime(date.getTime() + minutes * 60 * 1000);
          cookies.set('_token', token, {
            path: '/',
            expires: date
          });
        }
      })
      .catch(({ body: { ajaxRequestStatus, errorCode, errorData } }) =>
        console.error('errorCode', errorCode, 'errorData', errorData)
      );
  }

  render() {
    const loginFormProps = {
      initialValues: {
        emailField: '',
        passwordField: ''
      },
      action: '/',
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
