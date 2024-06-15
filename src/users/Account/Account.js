import React, { useState, useEffect } from 'react';
import Header from "../../header/Header";
import chaveImage from '../../assets/chave.png';
import sairImage from '../../assets/sair.png';
import './Account.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../authcontext/AuthContext";

const Account = () => {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState(null);

  // Definir a função fetchReports dentro do escopo do componente
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }
      
      const response = await fetch(`http://127.0.0.1:3000/orders/reports/${user.id}`, {
        headers: {
          'x-access-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar relatórios');
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReports(); // Chamada inicial para buscar os relatórios ao carregar o componente
    }
  }, [user]); // Executar useEffect sempre que user mudar

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
              <div>
                {reports && reports.length > 0 ? (
                  reports.map((report, index) => (
                    <div key={index}>
                      <h2>Relatório {index + 1}</h2>
                      <pre>{report.report}</pre>
                    </div>
                  ))
                ) : (
                  <p>Nenhum relatório encontrado</p>
                )}
              </div>
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
