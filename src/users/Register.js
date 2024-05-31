import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NewUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleName: '',
    roleScopes: '',
    confirmPassword: ''
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
    const response = await fetch('http://127.0.0.1:3000/auth/register', {
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

    const data = await response.json();

    if (response.status === 200) {
      prompt("Usuário criado com sucesso. Copie o token:", data.token);
      navigate('/login');
    } else {
      console.log('Erro ao criar usuário:', data);
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
};

return (
  <div className="login-page">
    <h1>Registar</h1>
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        id="nomee2"
        type="text"
        name="roleName"
        placeholder="Nome2"
        value={formData.roleName}
        onChange={handleChange}
        required
      />
      <input
        id="name2"
        type="text"
        name="roleScopes"
        placeholder="scope"
        value={formData.roleScopes}
        onChange={handleChange}
        required
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Palavra-passe"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        placeholder="Confirmar Palavra-passe"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit">Registar</button>
    </form>
    <div className="center">
      <p>Já tem uma conta? <Link to="/login">Iniciar sessão</Link></p>
      <p>Esqueceu-se da palavra-passe? <Link to="/forgot-password">Recuperar Palavra-passe</Link></p>
    </div>
  </div>
);
}


export default NewUserPage;