import { Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import BlogDetails from "./pages/BlogDetails";
import BlogEntryPage from "./pages/BlogEntryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PofilePage from "./pages/PofilePage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfileProvider from "./providers/ProfileProvider";
import PrivateRoutes from "./routes/PrivateRoutes";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route
          element={
            <ProfileProvider>
              <PofilePage />
            </ProfileProvider>
          }
          path="/profile/:userId"
        />
        <Route element={<BlogDetails />} path="/blogDetails/:blogId" />
        <Route element={<PrivateRoutes />}>
          <Route element={<BlogEntryPage />} path="/blogEntry" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
      <Footer />
    </>
  );
}
