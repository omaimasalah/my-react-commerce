import { useState } from "react";
import * as Yup from "yup";
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { ErrorMessage, Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "/firebaseConfig";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("UserName is Required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required"),
  });

  const handleSubmit = async (values) => {

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      Swal.fire({
        title: "Account Created",
        text: "Your account has been created successfully",
        icon: "success",
      }).then(() => {
        navigate("/Login");
      });
    } catch (error) {
        consol.log("error massage:" , error.message)
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto w-[500px] p-[50px] border-2 border-gray-300 mt-24">

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          repassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="mb-4">
              <label>Username</label>
              <Field name="name" className="w-full border p-3" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label>Email</label>
              <Field name="email" className="w-full border p-3" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label>Password</label>

              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full border p-3 pr-10"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            {/* Re-Password */}
            <div className="mb-4 relative">
              <label>Re-Password</label>

              <Field
                type={showRePassword ? "text" : "password"}
                name="repassword"
                className="w-full border p-3 pr-10"
              />

              <span
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-3 top-9 text-gray-600 cursor-pointer"
              >
                {showRePassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              <ErrorMessage
                name="repassword"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full text-white px-4 py-2 rounded ${
                isSubmitting ? "bg-gray-400" : "bg-blue-500"
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

          </form>
        )}
      </Formik>

    </div>
  );
};

export default Register;