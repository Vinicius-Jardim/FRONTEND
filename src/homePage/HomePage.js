import "./HomePage.css";
import { Link } from "react-router-dom";
import logoHP from "../assets/logo.png";

const HomePage = ({ onSearch}) => {
  return (
    <div className="home-content">
      <img className="logoHP" src={logoHP} alt="" />
      <Link to="/products" className="welcome-link">
        W e l c o m e !
      </Link>
    </div>
  );
};
export default HomePage;
