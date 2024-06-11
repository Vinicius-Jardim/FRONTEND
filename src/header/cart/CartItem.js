import React from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./CartItem.css";

function CartItem(data) {
  const { product } = data;

  return (
    <section className="cart-item">
      <img
        alt={product.image}
        src={product.imagem}
        className="cart-item-image"
      />
      <div className="cart-item-content">
        <h3 className="cart-item-title">{product.titulo}</h3>
        <h3 className="cart-item-price">{product.preço}</h3>

        <button type="button" className="cart__remove-item">
          <RemoveShoppingCartIcon />{" "}
        </button>
      </div>
    </section>
  );
}

export default CartItem;
