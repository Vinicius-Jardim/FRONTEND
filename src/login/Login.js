import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../authcontext/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState(""); // Adicione esta linha
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Altere 'name' para 'username'
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Ocorreu um erro ao fazer login");
      }
    }
  };

  


  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h6 className="RecuperarPassword">
          Esqueceu-se da palavra-passe?{" "}
          <Link className="RecuperarPassword" to="/recover">
            Recuperar Palavra-passe
          </Link>
        </h6>
        <button type="submit" className="buttonEntrar">
          Entrar
        </button>
        <h6 className="CriarConta">
          Não tens uma conta?{" "}
          <Link className="CriarConta" to="/register">
            Criar conta
          </Link>
        </h6>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginPage;