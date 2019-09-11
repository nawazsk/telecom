/**.
 * @author shivam
 */
// @flow
import React, { Component } from 'react';
import Form from '../../molecules/Form';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Para';
import AjaxFactoryUtil from '../../../utils/AjaxFactoryUtil';
import Cookies from 'universal-cookie';
import { LOGIN_API_URI, USER_DETAILS_URI } from './constants';
import Loggger from "../../../utils/logger";
type Props = {
  className?: string
};

class LoginForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.submitLoginForm = this.submitLoginForm.bind(this);
    // TODO
    this.state = {
      loggedIn: false,
      contentForUser: '',
      userName: ''
    };
  }

  submitLoginForm(values) {
    const { emailField: username, passwordField: password } = values;
    const options = {
      url: LOGIN_API_URI,
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
          const minutes = 1;
          const date = new Date();
          date.setTime(date.getTime() + minutes * 60 * 1000);
          cookies.set('_token', token, {
            path: '/',
            expires: date
          });
          // TODO
          this.setState({ loggedIn: true, userName: username });
        }
      })
      .catch(({ body: { ajaxRequestStatus, errorCode, errorData } }) =>
        Loggger('errorCode', errorCode, 'errorData', errorData)
      );
  }

  getUserDetails() {
    const options = {
      url: USER_DETAILS_URI,
      method: 'get',
      headers: {
        Accept: 'application/json'
      }
    };
    AjaxFactoryUtil.triggerServerRequest(options)
      .then(({ body: { data, ajaxRequestStatus } }) => {
        if (ajaxRequestStatus === 'SUCCESS') {
          const { content } = data;
          // TODO
          this.setState({ contentForUser: content });
        }
      })
      .catch(({ body: { ajaxRequestStatus, errorCode, errorData } }) =>
        Loggger('errorCode', errorCode, 'errorData', errorData)
      );
  }

  render() {
    const { loggedIn, contentForUser, userName } = this.state;
    if (contentForUser) {
      // TODO
      return (
        <div className="text-center">
          <Heading HeadingType="h1">Welcome {userName} !</Heading>
          <Paragraph>{contentForUser}</Paragraph>
          <Paragraph>
            <a href="https://www.publicissapient.com/">Please contact us.</a>
          </Paragraph>
        </div>
      );
    } else if (loggedIn) {
      // TODO
      this.getUserDetails();
      return null;
    } else {
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
            <Heading HeadingType="h1">Please Login</Heading>

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
}

LoginForm.defaultProps = {
  className: 'loginModule row pd1'
};

export default LoginForm;
