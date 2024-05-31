import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homePage">
        <h1>Bem vindo!</h1>
       <p> <Link to="/products">Products</Link> </p>
        <p><Link to="/login">Login</Link> </p>
        <Link to="/orders">Orders</Link>
        </div>
    );
    }

export default HomePage;