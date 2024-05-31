import "./Products.css";
import config from "../Config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Product from "./Product";

const Products = () => {
    let navigate = useNavigate();
    const [loading , setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!config.token) {
            navigate('/login');
        } else {
            fetch('http://127.0.0.1:3000/store/products', {
                headers: {Accept: 'application/json', 'x-access-token': config.token},
            })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                setProducts(response);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
        return () => setProducts([]);
    }, []);

    return (
        <div className="products">
            {loading ? (
                <p>Loading...</p>
            ) : (
                products.map((product) => (
                    <div key={product._id}>
                        <h2>{product.titulo}</h2>
                        <p>Em Stock: {product.stock}</p>
                       {product.preço} € 
                       <p>{product.descrição} </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Products;