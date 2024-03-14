import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAvatar } from "../hooks/useAvatar";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setAvatar } = useAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;

          console.log(`auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });
          setAvatar(user?.avatar);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} login failed!`,
      });
    }
  };

  return (
    <main>
      <section className="container">
        {/* <!-- Login Form into a box center of the page --> */}
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
                type="email"
                id="email"
                name="email"
              />
              {errors.email && (
                <div role="alert" className="text-red-600">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be minimum 8 characters",
                  },
                })}
                className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
                type="password"
                id="password"
                name="password"
              />
              {errors.password && (
                <div role="alert" className="text-red-600">
                  {errors.password.message}
                </div>
              )}
            </div>

            <p className="my-2">{errors?.root?.random?.message}</p>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Do not have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
