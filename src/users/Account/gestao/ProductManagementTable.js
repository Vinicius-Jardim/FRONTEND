import React from 'react';

const ProductManagementTable = ({ products, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Categoria</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Classificação</th>
          <th>Estoque</th>
          <th>Quantidade Mínima</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.titulo}</td>
            <td>{product.categoria}</td>
            <td>{product.descrição}</td>
            <td>{product.preço}</td>
            <td>{product.classificação}</td>
            <td>{product.stock}</td>
            <td>{product.minimumQuantity}</td>
            <td>
              <button onClick={() => onEdit(product)}>Editar</button>
              <button onClick={() => onDelete(product._id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductManagementTable;
