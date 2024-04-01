import { useNavigate, Link } from "react-router-dom";
import pokeLogo from "../assets/poke_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // style variables
  const linkStyle = "font-semibold";
  const hoverLink = "hover:text-yellow-500 hover:font-bold";
  return (
    <nav className="NavBar w-screen h-nav bg-blue-900 text-white flex justify-between">
      <div className="Logo h-full w-3/5 pl-5">
        <img
          onClick={() => {
            navigate("/pokemon");
          }}
          src={pokeLogo}
          alt="site logo"
          className="h-full"
        />
      </div>
      <div className="Links flex items-center pr-5">
        <ul className="flex flex-row gap-3">
          <Link to="/team">
            <li className={`${linkStyle} ${hoverLink}`}>Your Team</li>
          </Link>
          <li className={`${linkStyle} ${hoverLink}`}>Take a pika-ture</li>
          <li
            onClick={() => navigate("/quiz")}
            className={`${linkStyle} ${hoverLink}`}
          >
            PokeQuiz
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
