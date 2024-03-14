import { useState } from "react";
import { Link } from "react-router-dom";
import Portal from "../../Portal";
import SearchIcon from "../../assets/icons/search.svg";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import Logout from "../auth/Logout";
import SearchModal from "../search/SearchModal";

export default function Header() {
  const { auth } = useAuth();
  const { avatar } = useAvatar();

  const [showSearch, setShowSearch] = useState(false);

  const user = auth?.user;

  return (
    <>
      <header>
        <nav className="container">
          <div>
            <Link to="/">
              <img className="w-32" src={Logo} alt="lws" />
            </Link>
          </div>

          <div>
            <ul className="flex items-center space-x-5">
              <li>
                <Link
                  to="/blogEntry"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
              {!auth?.authToken ? (
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setShowSearch(true)}
                    >
                      <img src={SearchIcon} alt="Search" />
                      <span>Search</span>
                    </button>
                  </li>

                  <li>
                    <Logout />
                  </li>

                  <li className="flex items-center">
                    <Link to={`/profile/${user?.id}`}>
                      {avatar ? (
                        <div className="avater-img">
                          <img
                            className="rounded-full"
                            src={`${
                              import.meta.env.VITE_SERVER_BASE_URL
                            }/uploads/avatar/${avatar}`}
                            alt={user?.firstName}
                          />
                        </div>
                      ) : (
                        <div className="avater-img bg-orange-600 text-white">
                          <span>{user?.firstName[0]}</span>
                        </div>
                      )}
                    </Link>

                    <Link to={`/profile/${user?.id}`}>
                      <span className="text-white ml-2">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {showSearch && (
        <Portal>
          <SearchModal onClose={() => setShowSearch(false)} />
        </Portal>
      )}
    </>
  );
}
