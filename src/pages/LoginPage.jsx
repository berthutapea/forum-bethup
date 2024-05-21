import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login } from '../components';
import { asyncLogin } from '../app/states/authUser/action';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncLogin({ email, password })).then(({ status }) => {
      if (status === 'success') navigate('/');
    });
  };

  return (
    <section>
      <Login onLogin={onLogin} />
    </section>
  );
}
