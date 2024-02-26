import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css'

const NotFoundPage = () => {
  return (
    <div className='error'>  
      <h1>404</h1>
      <p>Oups! La page que vous demandez n'existe pas.</p>
      <Link to="/" className="error__link"> 
        Retourner sur la page d'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
