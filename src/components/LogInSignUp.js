import React from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { logIn, signUp } from '../actions/actions';

const LogInSignUp = ({ logIn, signUp, errorStatusCode, history }) => {
  const usernameLogIn = useInput();
  const passwordLogIn = useInput();
  const usernameSignUp = useInput();
  const passwordSignUp = useInput();

  const requestLogIn = e => {
    e.preventDefault();
    logIn({
      username: usernameLogIn.value,
      password: passwordLogIn.value
    }).then(() => {
      if (errorStatusCode) {
        alert('username or password incorrect');
      } else {
        usernameLogIn.setValue('');
        passwordLogIn.setValue('');
        history.push('/');
      }
    });
  };

  const requestSignUp = e => {
    e.preventDefault();
    signUp({
      username: usernameSignUp.value,
      password: passwordSignUp.value
    }).then(() => {
      if (errorStatusCode) {
        alert('Error signing up. Please try again.');
      } else {
        usernameSignUp.setValue('');
        passwordSignUp.setValue('');
        alert('Please log in with your new username and password.');
      }
    });
  };

  return (
    <div className='login-signup'>
      <h1 className='title'>Saltiest Hacker News Trolls</h1>
      <h2 className='subtitle'>Sentiment Analysis</h2>
      <form onSubmit={requestLogIn}>
        <input
          required
          type='text'
          value={usernameLogIn.value}
          name='usernameLogIn'
          onChange={usernameLogIn.updateValue}
          placeholder='username'
        />
        <input
          required
          type='password'
          value={passwordLogIn.value}
          name='passwordLogIn'
          onChange={passwordLogIn.updateValue}
          placeholder='password'
        />
        <button type='submit' className='edit'>
          Log In
        </button>
      </form>
      <img
        src='https://i.ytimg.com/vi/Y7tnhz95q2o/maxresdefault.jpg'
        alt='troll doll collecion'
      />
      <h2>Not yet a member? Sign up now (it's free):</h2>
      <form onSubmit={requestSignUp}>
        <input
          required
          autoComplete='off'
          type='text'
          value={usernameSignUp.value}
          name='usernameSignUp'
          onChange={usernameSignUp.updateValue}
          placeholder='username'
        />
        <input
          required
          autoComplete='off'
          type='password'
          value={passwordSignUp.value}
          name='passwordSignUp'
          onChange={passwordSignUp.updateValue}
          placeholder='password'
        />
        <button type='submit' className='signup'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ errorStatusCode }) => ({
  errorStatusCode
});

export default connect(
  mapStateToProps,
  { logIn, signUp }
)(LogInSignUp);
