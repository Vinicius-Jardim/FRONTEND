import React, { useState, useEffect } from "react";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: { name: "client", scopes: ["client"] },
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/users", {
        headers: {
          Accept: "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Falha ao buscar usuários");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const createUser = async () => {
    try {
      const userToCreate = { ...newUser }; // Cria uma cópia do objeto newUser

      const response = await fetch("http://127.0.0.1:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //nao coloquei o token aqui, indiferente
        body: JSON.stringify(userToCreate),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar usuário");
      }

      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: { name: "client", scopes: ["client"] },
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/auth/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(editingUser),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao atualizar usuário");
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao excluir usuário");
      }

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleEditChange = (field, value) => {
    if (field === "role") {
      setEditingUser({
        ...editingUser,
        role: { name: value, scopes: [value] },
      });
    } else {
      setEditingUser({ ...editingUser, [field]: value });
    }
  };

  const handleNewUserChange = (field, value) => {
    if (field === "role") {
      setNewUser({ ...newUser, role: { name: value, scopes: [value] } });
    } else {
      setNewUser({ ...newUser, [field]: value });
    }
  };

  return (
    <div className="admin-container">
      <h2>Administração de Usuários</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Formulário de Novo Usuário */}
        <div style={{ flex: "1" }}>
          <h3>Novo Usuário</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={newUser.name}
              onChange={(e) => handleNewUserChange("name", e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => handleNewUserChange("email", e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={newUser.password}
              onChange={(e) => handleNewUserChange("password", e.target.value)}
            />
            <select
              value={newUser.role.name}
              onChange={(e) => handleNewUserChange("role", e.target.value)}
            >
              <option value="client">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
            <button onClick={createUser}>Adicionar Usuário</button>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <h3>Lista de Usuários</h3>
          <div style={{ marginBottom: "12px" }}>
            {users &&
              users.map(
                (user) =>
                  user &&
                  user.role && (
                    <div
                      key={user._id}
                      style={{
                        marginBottom: "12px",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "8px",
                      }}
                    >
                      {editingUser?._id === user._id ? (
                        // Modo de edição do usuário
                        <>
                          <div>
                            <label>Nome:</label>
                            <input
                              value={editingUser.name}
                              onChange={(e) =>
                                handleEditChange("name", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label>Email:</label>
                            <input
                              value={editingUser.email}
                              onChange={(e) =>
                                handleEditChange("email", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label>Papel:</label>
                            <select
                              value={editingUser.role.name}
                              onChange={(e) =>
                                handleEditChange("role", e.target.value)
                              }
                            >
                              <option value="client">Cliente</option>
                              <option value="admin">Administrador</option>
                            </select>
                          </div>
                          <button onClick={() => updateUser(user._id)}>
                            Salvar
                          </button>
                        </>
                      ) : (
                        // Modo de visualização do usuário
                        <>
                          <div>
                            <strong>Nome:</strong> {user.name}
                          </div>
                          <div>
                            <strong>Email:</strong> {user.email}
                          </div>
                          <div>
                            <strong>Papel:</strong> {user.role.name}
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            <button
                              className="edit-btn "
                              onClick={() => setEditingUser(user)}
                            >
                              Editar
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => deleteUser(user._id)}
                            >
                              Excluir
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
