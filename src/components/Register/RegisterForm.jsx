import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../../hooks';

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <>
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full"
        value={name}
        onChange={setName}
      />
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
        onClick={() => onRegister({ name, email, password })}
      >
        Register
      </button>
    </>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
