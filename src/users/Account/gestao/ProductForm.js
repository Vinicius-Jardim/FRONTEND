import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSave, selectedProduct }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    descrição: '',
    preço: '',
    classificação: '',
    stock: '',
    minimumQuantity: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedProduct ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required />
      <input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoria" required />
      <input name="descrição" value={formData.descrição} onChange={handleChange} placeholder="Descrição" required />
      <input name="preço" type="number" value={formData.preço} onChange={handleChange} placeholder="Preço" required />
      <input name="classificação" type="number" value={formData.classificação} onChange={handleChange} placeholder="Classificação" required />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Estoque" required />
      <input name="minimumQuantity" type="number" value={formData.minimumQuantity} onChange={handleChange} placeholder="Quantidade Mínima" required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
