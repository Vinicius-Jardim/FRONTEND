import React, { useState, useEffect } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: { name: 'client', scopes: ['client'] } });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/auth/users', {
        headers: { 
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar usuários');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  
  const createUser = async () => {
    try {
      const userToCreate = { ...newUser }; // Cria uma cópia do objeto newUser

      const response = await fetch('http://127.0.0.1:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //nao coloquei o token aqui, indiferente
        body: JSON.stringify(userToCreate),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar usuário');
      }

      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ name: '', email: '', password: '', role: { name: 'client', scopes: ['client'] } });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/auth/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token')},
        body: JSON.stringify(editingUser),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar usuário');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => (user._id === userId ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir usuário');
      }

      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleEditChange = (field, value) => {
    if (field === 'role') {
      setEditingUser({ ...editingUser, role: { name: value, scopes: [value] } });
    } else {
      setEditingUser({ ...editingUser, [field]: value });
    }
  };

  const handleNewUserChange = (field, value) => {
    if (field === 'role') {
      setNewUser({ ...newUser, role: { name: value, scopes: [value] } });
    } else {
      setNewUser({ ...newUser, [field]: value });
    }
  };

  return (
    <div>
      <h2>Administração de Usuários</h2>
      <div>
        <h3>Novo Usuário</h3>
        <input type="text" placeholder="Nome" value={newUser.name} onChange={(e) => handleNewUserChange('name', e.target.value)} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => handleNewUserChange('email', e.target.value)} />
        <input type="password" placeholder="Senha" value={newUser.password} onChange={(e) => handleNewUserChange('password', e.target.value)} />
        <select value={newUser.role.name} onChange={(e) => handleNewUserChange('role', e.target.value)}>
          <option value="client">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
        <button onClick={createUser}>Adicionar Usuário</button>
      </div>
      <h3>Lista de Usuários</h3>
      <ul>
      {users && users.map((user) => (
  user && user.role && (
    <li key={user._id}>
      {editingUser?._id === user._id ? (
        <>
          <input value={editingUser.email} onChange={(e) => handleEditChange('email', e.target.value)} />
          <select value={editingUser.role.name} onChange={(e) => handleEditChange('role', e.target.value)}>
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <button onClick={() => updateUser(user._id)}>Salvar</button>
        </>
      ) : (
        <>
          {user.name} - {user.email} - {user.role.name}
          <button onClick={() => setEditingUser(user)}>Editar</button>
          <button onClick={() => deleteUser(user._id)}>Excluir</button>
        </>
      )}
    </li>
  )
))}
      </ul>
    </div>
  );
};

export default AdminUsers;
