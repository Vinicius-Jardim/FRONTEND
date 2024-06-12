import React from 'react';
import Header from "../../header/Header";
import chaveImage from '../../assets/chave.png';
import sairImage from '../../assets/sair.png';
import './Account.css';
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h2 className="title">Recuperação de Palavra-Passe</h2>
        <div className="button-container">
        <button className="button">
        <Link to="/changepassword">
         <img src={chaveImage} alt="Recuperar Palavra-Passe" className="icon" />
             Recuperar Palavra-Passe
           </Link>
          </button>
          <button className="button">
            <img src={sairImage} alt="Sair" className="icon" />
            Sair do Login
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Account;