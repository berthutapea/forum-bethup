import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../../hooks';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <>
      <input
        type="text"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={setEmail}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        value={password}
        onChange={setPassword}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => onLogin({ email, password })}
      >
        Login
      </button>
    </>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
