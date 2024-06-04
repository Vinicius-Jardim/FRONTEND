import React, { useState } from 'react';

// Componente para solicitar a recuperação de senha
function PasswordRecovery() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch('http://localhost:3000/password/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      alert('Email de recuperação de senha enviado');
    } catch (error) {
      alert('Erro ao enviar email de recuperação de senha');
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h1>Digite seu email:</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
     <button type="submit">Recuperar senha</button>
    </form>
  );
}

export default PasswordRecovery;