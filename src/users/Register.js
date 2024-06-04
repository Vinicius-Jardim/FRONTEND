import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const NewUserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleName: "",
    roleScopes: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As palavras-passe não coincidem");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: {
            name: formData.roleName,
            scopes: formData.roleScopes.split(","),
          },
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        prompt("Usuário criado com sucesso. Copie o token:", data.token);
        navigate("/login");
      } else {
        console.log("Erro ao criar usuário:", data);
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Registar</h1>{" "}
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
          id="RoleName"
          type="text"
          name="roleName"
          placeholder="RoleName"
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
        <h5 className="IniciarSessao">
          Já tem uma conta? <Link className="IniciarSessao" to="/login">Iniciar sessão</Link>
        </h5>
      </form>
    </div>
  );
};

export default NewUserPage;
