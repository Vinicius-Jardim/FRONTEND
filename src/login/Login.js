import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/products");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message ||
            "Erro interno do servidor. Por favor, tente novamente mais tarde ou troque de usuário."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Erro interno do servidor. Por favor, tente novamente mais tarde ou troque de usuário."
      );
    }
  };

  return (
    <div className="login-page">
      <form className="login-form">
        <h1>Login</h1>
        <input
          type="username"
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
          <Link className="RecuperarPassword" to="/forgot-password">Recuperar Palavra-passe</Link>
        </h6>
        <button type="button" className="buttonEntrar" onClick={handleLogin}>
          Entrar
        </button>
        <h6 className="CriarConta">
          Não tens uma conta? <Link className="CriarConta" to="/register">Criar conta</Link>
        </h6>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
