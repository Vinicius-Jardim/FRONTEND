import "./Product.css";

const Product = (props) => {


  return (
    <li className="product">
      <div className="product_titulo">
        <label className="product-label">{props.titulo} </label>
      </div>
      <div className="product_preco">
        <label className="product-label">{props.preço} </label>
      </div>
      <div className="product_stock">
        <label className="product-label">Em stock: {props.stock} </label>
      </div>
    </li>
  );
};

export default Product;
