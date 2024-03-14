import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
}
