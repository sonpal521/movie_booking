
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/logo.png";
import { useAppDispatch } from "../Hooks/hooks";
import { logout } from "../Redux/Slices/AuthSlice";
import { RootState } from "../Redux/store";


interface AuthState {
  isLoggedIn: boolean;
  role: string;
}

function Navbar() {
 
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-[#333545] pt-1">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block h-12 mr-8" href="#">
              <Link to="/">
                <img src={Logo} alt="" className="w-36 h-[100%]" />
              </Link>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div>
              {authState.role === "ADMIN" && (
                <Link to="/dashboard" className="text-white mr-4">
                  Dashboard
                </Link>
              )}
            </div>
            {authState.isLoggedIn ? (
              <Link to="/login"  onClick={handleLogout}  className="rounded-md bg-blue-600 cursor-pointer px-5 py-2.5 text-sm font-medium text-white shadow">
               Logout
              </Link>
            
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                to="/login"
                  className="rounded-md bg-blue-600 cursor-pointer  px-5 py-2.5 text-sm font-medium text-white shadow"
                  
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link to= "/signup"
                    className="rounded-md bg-indigo-100 cursor-pointer px-5 py-2.5 text-sm font-medium text-blue-600"
                    
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
            <div />

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white bg-[#22232d]">
        <div className="flex gap-4 w-[80vw] mx-auto py-2">
          <div>Movies</div>
          <div>Events</div>
          <div>Stream</div>
          <div>Plays</div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
