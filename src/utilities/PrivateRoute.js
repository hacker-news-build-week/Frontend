import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, errorStatusCode, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        localStorage.getItem('saltyToken') && errorStatusCode !== 403 ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to='/loginsignup' />
        )
      }
    />
  );
};

const mapStateToProps = ({ errorStatusCode }) => ({
  errorStatusCode
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(PrivateRoute)
);
