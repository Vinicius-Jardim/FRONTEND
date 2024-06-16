import React, { useState, useEffect } from 'react';
import Header from "../../header/Header";
import chaveImage from '../../assets/chave.png';
import sairImage from '../../assets/sair.png';
import './Account.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../authcontext/AuthContext";
import Footer from "../../footer/Footer";

const Account = () => {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState(null);
  const [showReports, setShowReports] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: '', email: '' });

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

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await fetch(`http://127.0.0.1:3000/auth/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(editProfile)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      const updatedUser = await response.json();
      setEditProfile({ name: updatedUser.name, email: updatedUser.email });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  useEffect(() => {
    if (user && showReports) {
      fetchReports();
    }
  }, [user, showReports]);

  const handleEditChange = (field, value) => {
    setEditProfile({ ...editProfile, [field]: value });
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
              <button className="button" onClick={() => {
                setShowReports(prev => !prev);
                setHasClicked(true);
              }}>
                Ver Encomendas
              </button>
              <button className="button" onClick={() => {
                setEditProfile({ name: user.name, email: user.email });
                setIsEditing(true);
              }}>
                Editar Perfil
              </button>
              <div>
                {showReports && reports && reports.length > 0 ? (
                  reports.map((report, index) => (
                    <div key={index}>
                      <h2>Relatório {index + 1}</h2>
                      <pre>{report.report}</pre>
                    </div>
                  ))
                ) : hasClicked ? (
                  <p>Nenhum relatório encontrado</p>
                ) : null}
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

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Perfil</h3>
            <input
              type="text"
              placeholder="Nome"
              value={editProfile.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={editProfile.email}
              onChange={(e) => handleEditChange('email', e.target.value)}
            />
            <button onClick={updateProfile}>Salvar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Account;
