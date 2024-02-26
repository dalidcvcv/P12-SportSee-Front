import './MenuTop.css'; 
import {Link} from "react-router-dom";
import logo from '../../assets/logo.png';


function Navbar({ userId }) {
  return (
    <nav className="topnav">
          <img src={logo} alt="Logo de SportSee" />
          <div className="topmenu">
              
              <Link to="/#" className="menu">Accueil</Link>
              <Link to={`/user/${userId}/Profil`} className="menu">Profil</Link>
              <Link to={`/user/${userId}/Réglage`} className="menu">Réglage</Link>
              <Link to={`/user/${userId}/Communauté`} className="menu">Communauté</Link>
         
          </div>
      </nav>
  )
}
export default Navbar;