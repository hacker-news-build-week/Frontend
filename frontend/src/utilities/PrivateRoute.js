import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  saltyToken,
  errorStatusCode,
  ...rest
}) => {
  console.log('private route');
  return (
    <Route
      {...rest}
      render={routeProps =>
        saltyToken && errorStatusCode !== 403 ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to='/loginsignup' />
        )
      }
    />
  );
};

const mapStateToProps = ({ saltyToken, errorStatusCode }) => ({
  saltyToken,
  errorStatusCode
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(PrivateRoute)
);
