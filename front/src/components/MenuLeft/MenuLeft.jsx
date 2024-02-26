import { Link } from 'react-router-dom';
import relaxation from "../../assets/relaxation.png";
import swimming from "../../assets/swimming.png";
import bike from "../../assets/bike.png";
import bodybuilding from "../../assets/bodybuilding.png";
import './MenuLeft.css'

function MenuLeft({ userId }) {
    console.log("MenuLeft userId:", userId); 
    return (
        <aside className="leftnav">
            <div className="categories">
                <Link to={`/user/${userId}/yoga`}>
                    <img src={relaxation} alt="relaxation" />
                </Link>
                <Link to={`/user/${userId}/swimming`}>
                    <img src={swimming} alt="swimming" />
                </Link>
                <Link to={`/user/${userId}/bike`}>
                    <img src={bike} alt="bike" />
                </Link>
                <Link to={`/user/${userId}/bodybuilding`}>
                    <img src={bodybuilding} alt="bodybuilding" />
                </Link>
            </div>
            <div className="copyright" ><p>Copyright, SportSee 2020</p></div>
        </aside>
    );
}
export default MenuLeft;