import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NewUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleName: '',
    roleScopes: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('As palavras-passe não coincidem');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:3000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: {
              name: formData.roleName,
              scopes: formData.roleScopes.split(',')
            }
          }),
      });
  
      if (response.status === 201) {
        console.log('Usuário criado com sucesso:', await response.json());
        navigate('/login');
      } else {
        console.log('Erro ao criar usuário:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };
return (
  <div>
  
  <div className="container form-container">
    <h4 className="center">Registar</h4>
    <form onSubmit={handleSubmit} className="row">
      <div className="input-field col s12">
        <input
          id="name"
          type="text"
          name="name"
          className="validate"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="name">Nome</label>
      </div>
      <div className="input-field col s12">
        <input
          id="email"
          type="email"
          name="email"
          className="validate"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field col s12">
        <input
          id="password"
          type="password"
          name="password"
          className="validate"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Palavra-passe</label>
      </div>
      <div className="input-field col s12">
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="validate"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirmar Palavra-passe</label>
      </div>
      <div className="center">
        <button type="submit" className="btn teal">Registar</button>
      </div>
    </form>
    <div className="center">
      <p>Já tem uma conta? <Link to="/login">Iniciar sessão</Link></p>
      <p>Esqueceu-se da palavra-passe? <Link to="/forgot-password">Recuperar Palavra-passe</Link></p>
    </div>
  </div>
  
</div>
);
};


export default NewUserPage;