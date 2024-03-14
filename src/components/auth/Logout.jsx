import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";

export default function Logout() {
  const navigte = useNavigate();
  const { setAuth } = useAuth();
  const { setAvatar } = useAvatar();

  const handleLogout = () => {
    setAuth({});
    setAvatar(null);
    navigte("login");
  };
  return (
    <button className="icon-btn" onClick={handleLogout}>
      <span>Logout</span>
    </button>
  );
}
