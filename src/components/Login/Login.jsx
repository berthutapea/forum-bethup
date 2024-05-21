import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import logoForumBetHup from '../../assets/images/logo/logo-forum-BetHup.png';

const Login = ({ onLogin }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)]">
      <div className="flex items-center mb-4">
        <img
          src={logoForumBetHup}
          alt="Logo Forum BetHup"
          className="w-20 mr-2"
          title="Logo Forum BetHup"
        />
      </div>
      <h1 className="text-xl font-bold">Forum BetHup</h1>
      <div className="card w-96 border border-info mt-4">
        <div className="card-body gap-3">
          <LoginForm onLogin={onLogin} />
          <p>
            Dont have an account yet?{' '}
            <Link className="link text-info" to="/register">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
