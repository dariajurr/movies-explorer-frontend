import React from 'react';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { loggedIn } = React.useContext(CurrentUserContext);

  return (
    <>
      { loggedIn ? <Component {...props} /> : <Redirect to='/'/>}
    </>      
  );
};

export default ProtectedRoute; 