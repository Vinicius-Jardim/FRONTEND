import React, { useState } from 'react';
import Header from "../../header/Header";
import chaveImage from '../../assets/chave.png';
import sairImage from '../../assets/sair.png';
import './Account.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../authcontext/AuthContext";

const Account = () => {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState(null);

  const fetchReports = async () => {
    console.log(user); // Adicione esta linha
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:3000/oders/reports/user/${user.id}`, {
      headers: {
        'x-access-token': token
      }
    });
    const data = await response.json();
    setReports(data);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {user ? (
          <>
            <h2 className="title">Bem-vindo, {user.name}!</h2>
            <div className="button-container">
              <button className="button">
                <Link to="/changepassword">
                  <img src={chaveImage} alt="Recuperar Palavra-Passe" className="icon" />
                  Recuperar Palavra-Passe
                </Link>
              </button>
              <button className="button" onClick={logout}>
                <img src={sairImage} alt="Sair" className="icon" />
                Sair do Login
              </button>
              <button className="button" onClick={fetchReports}>
                Ver Encomendas
              </button>
              {reports && (
                <div>
                  {reports.map((report, index) => (
                    <div key={index}>
                      {/* Renderize os detalhes do relatório aqui */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="title">Você não está logado</h2>
            <div className="button-container">
              <button className="button">
                <Link to="/login">
                  <img src={sairImage} alt="Login" className="icon" />
                  Fazer Login
                </Link>
              </button>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Account;