import React, { useEffect, useState } from "react";
import Header from "./Header";
import FloatingLabelInput from "./FloatingLabelInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isSignup, setIsSignUp] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: isSignup
        ? Yup.string()
            .min(3, "Name must have at least 3 characters")
            .required("Full Name is required")
        : null,
      email: Yup.string()
        .email("Invalid email address")
        .required("Email or Mobile number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const { fullName, email, password } = values;
      setIsLoading(true);

      if (isSignup) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: fullName,
            })
              .then(() => {
                const { displayName, email, uid } = auth.currentUser;
                dispatch(addUser({ uid, email, displayName }));
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => setIsLoading(false));
          })
          .catch((error) => {
            const errorCode = error.code;
            switch (errorCode) {
              case "auth/email-already-in-use":
                setErrorMessage(
                  "This email is already associated with an account."
                );
                break;
              case "auth/wrong-password":
                setErrorMessage("Incorrect password. Please try again.");
                break;
              case "auth/invalid-email":
                setErrorMessage("The email address is invalid.");
                break;
              default:
                setErrorMessage("An error occurred. Please try again.");
            }
            setIsLoading(false);
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            const { displayName, email, uid } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName }));
          })
          .catch((error) => {
            const errorCode = error.code;

            switch (errorCode) {
              case "auth/invalid-credential":
                setErrorMessage("Wrong email or password");
                break;
              case "auth/user-not-found":
                setErrorMessage("No user found with this email.");
                break;
              case "auth/too-many-requests":
                setErrorMessage(
                  "Too many login attempts. Please try again later."
                );
                break;
              default:
                setErrorMessage("An error occurred. Please try again.");
            }
            setIsLoading(false);
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          })
          .finally(() => setIsLoading(false));
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [isSignup]);

  useEffect(() => {
    if (user) {
      navigate("/browse");
    }
  }, [user]);

  return (
    <>
      <Header />
      <main className="relative min-h-svh sm:min-h-screen overflow-hidden bg-gradient-to-b from-black via-transparent to-transparent">
        <div>
          <img
            className="absolute object-cover h-screen w-full"
            alt={`Background for Netflix ${isSignup ? "signup" : "login"}`}
            role="presentation"
            src="/img/loginBg.jpg"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-75 lg:opacity-60"></div>

        <form
          onSubmit={formik.handleSubmit}
          className="absolute w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] flex flex-col gap-y-4 rounded bg-black bg-opacity-90 lg:bg-opacity-80 text-white py-4 lg:py-10 px-8 lg:px-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h1 className="text-3xl font-bold mb-2">
            {isSignup ? "Sign Up" : "Sign In"}
          </h1>
          {isSignup && (
            <FloatingLabelInput
              label="Full Name"
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && formik.errors.fullName}
            />
          )}
          <FloatingLabelInput
            label="Email"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          <FloatingLabelInput
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          {errorMessage}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 p-2.5 rounded-md font-semibold"
          >
            {isLoading
              ? isSignup
                ? "Signing Up..."
                : "Signing In..."
              : isSignup
              ? "Sign Up"
              : "Sign In"}
          </button>
          {isSignup ? (
            <h4 className="text-gray-400 mt-3">
              Already have an account?{" "}
              <span
                onClick={() => setIsSignUp(false)}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                Sign in now
              </span>
            </h4>
          ) : (
            <>
              <h4
                onClick={() => navigate("/forgot-password")}
                className="text-center my-3 cursor-pointer text-gray-400 hover:underline"
              >
                Forgot Password?
              </h4>
              <h4 className="text-gray-400">
                New to Netflix?{" "}
                <span
                  onClick={() => setIsSignUp(true)}
                  className="font-semibold text-white hover:underline cursor-pointer"
                >
                  Sign up now
                </span>
              </h4>
            </>
          )}
          <div className="text-center text-gray-400">OR</div>
          <div className="text-white text-sm text-left flex flex-col">
            <h4
              aria-label="Login using demo credentials"
              className="text-base font-m mb-1 "
            >
              Login using demo credentials:
            </h4>

            <div className="flex flex-col text-gray-400">
              <span>Email: demo@example.com</span>
              <span>Password: Pass1234</span>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AuthForm;
