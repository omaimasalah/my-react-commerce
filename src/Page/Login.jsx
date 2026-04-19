import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is Required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
  });

  const handleSubmit = async (values) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      Swal.fire({
        title: "Welcome Back 🎉",
        text: "Login Successfully",
        icon: "success",
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto w-[420px] border p-8 mt-24 rounded-lg shadow-md">

      <h2 className="text-3xl font-bold text-center mb-6">
        Login
      </h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2">Email</label>

              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border p-3 rounded"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block mb-2">Password</label>

              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full border p-3 rounded pr-10"
              />

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-11 cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded text-white font-semibold ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting
                ? "Logging in..."
                : "Login"}
            </button>

            {/* Register */}
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link
                to="/Register"
                className="text-blue-500 font-semibold"
              >
                Register
              </Link>
            </p>

          </form>
        )}
      </Formik>

    </div>
  );
};

export default Login;