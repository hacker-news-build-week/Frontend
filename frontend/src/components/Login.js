import React from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { login } from '../actions/actions';

const Login = ({ history, login }) => {
  const username = useInput();
  const password = useInput();

  const requestLogin = e => {
    e.preventDefault();
    login({ username: username.value, password: password.value }).then(() => {
      username.setValue('');
      password.setValue('');
      history.push('/');
    });
  };

  return (
    <form onSubmit={requestLogin}>
      <input
        required
        type='text'
        value={username.value}
        name='username'
        onChange={username.updateValue}
        placeholder='username'
      />
      <input
        type='text'
        value={password.value}
        name='password'
        onChange={password.updateValue}
        placeholder='password'
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default connect(
  null,
  { login }
)(Login);
