import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showLogin, setShowLogin] = React.useState(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        {showLogin ? (
          <Login onToggle={() => setShowLogin(false)} />
        ) : (
          <SignUp onToggle={() => setShowLogin(true)} />
        )}
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;