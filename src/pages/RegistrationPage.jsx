import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

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
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );

      if (response.status === 201) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;
          console.log(`auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} registration failed!`,
      });
    }
  };

  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-6">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
                type="text"
                id="firstName"
                name="firstName"
              />
              {errors.firstName && (
                <div role="alert" className="text-red-600">
                  {errors.firstName.message}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                className={`w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
                type="text"
                id="lastName"
                name="lastName"
              />
              {errors.lastName && (
                <div role="alert" className="text-red-600">
                  {errors.lastName.message}
                </div>
              )}
            </div>

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
                Create Account
              </button>
            </div>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
