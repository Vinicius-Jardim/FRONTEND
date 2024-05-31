import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homePage">
        <h1>Bem vindo!</h1>
       <p> <Link to="/products">Products</Link> </p>
        <p><Link to="/login">Login</Link> </p>
        <Link to="/orders">Orders</Link>
        <p><Link to="/register">Register</Link></p>
        </div>
    );
    }

export default HomePage;