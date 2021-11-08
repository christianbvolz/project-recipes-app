import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validadorFormat from 'email-format-check';
import { SetLocalStorage } from '../../services/LocalStorageUser';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const verification = () => {
    const minimum = 6;
    if (password.length > minimum && validadorFormat(email)) return true;
    return false;
  };

  const login = () => {
    SetLocalStorage('mealsToken', 1);
    SetLocalStorage('cocktailsToken', 1);
    SetLocalStorage('user', { email });
    history.push('/comidas');
  };

  return (
    <>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Password"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        id="btnLogin"
        disabled={ !verification() }
        type="button"
        data-testid="login-submit-btn"
        onClick={ login }
      >
        Entrar
      </button>
    </>
  );
}

export default Login;
