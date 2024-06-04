import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homePage">
        <Link to="/login">Bem vindo à nossa loja</Link>
        </div>
    );
}
export default HomePage;