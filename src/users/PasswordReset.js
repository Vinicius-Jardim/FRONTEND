import React, { useState } from 'react';

// Componente para redefinir a senha
function PasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não correspondem');
      return;
    }

    const token = window.location.pathname.split('/').pop();

    try {
      await fetch(`/password/reset/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });
      alert('Senha alterada com sucesso');
    } catch (error) {
      alert('Erro ao alterar a senha');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Alterar senha</button>
    </form>
  );
}

export default PasswordReset;