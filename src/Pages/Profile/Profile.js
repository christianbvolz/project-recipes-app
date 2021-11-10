import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';
import Footer from '../../components/Footer';

function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user'));

  const clearStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (

    <div>
      <HeaderWithoutSearch page="Perfil" />
      <h4 data-testid="profile-email">{email}</h4>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearStorage }
      >
        Sair
      </button>
      <Footer />
    </div>

  );
}

export default Profile;
