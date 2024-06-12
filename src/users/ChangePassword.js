import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePasswordPage() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, oldPassword: oldPassword, newPassword: newPassword }),
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message ||
            "Erro interno do servidor. Por favor, tente novamente mais tarde."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Erro interno do servidor. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="change-password-page">
      <form className="change-password-form">
        <h1>Alterar Senha</h1>
        <input
          type="username"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha antiga"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="button" className="buttonChange" onClick={handleChangePassword}>
          Alterar Senha
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ChangePasswordPage;