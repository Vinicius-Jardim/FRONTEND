import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homePage">
        <h1>Home Page</h1>
        <Link to="/products">Products</Link>
        </div>
    );
    }

export default HomePage;