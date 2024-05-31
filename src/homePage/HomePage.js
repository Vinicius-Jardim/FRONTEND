import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homePage">
        <h1>Bem vindo à nossa loja!</h1>
        <div className="links">
            <p><Link to="/products">Produtos</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/orders">Pedidos</Link></p>
            <p><Link to="/register">Registrar</Link></p>
        </div>
        </div>
    );
}

export default HomePage;