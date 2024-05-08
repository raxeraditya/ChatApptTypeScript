import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <main className="flex justify-between items-center px-5 py-4 h-full w-full bg-yellow-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <div className="right">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="left">
          <div className="container">
            <ul className="flex justify-between items-center gap-5">
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/messages"}>Chat</Link>
              </li>
              <li>
                <Link to={"/signup"}>
                  <button className="btn-blue">Signup</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Navbar;
