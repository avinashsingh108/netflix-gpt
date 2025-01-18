import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage(
            "If an account with this email exists, a password reset link has been sent."
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + " " + errorMessage);
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/browse");
    }
  }, [user]);
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-transparent to-transparent">
        <div>
          <img
            className="absolute object-cover h-screen w-full"
            alt="Background"
            role="presentation"
            src="/img/loginBg.jpg"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-75 lg:opacity-60"></div>

        <div className="relative mt-36 z-10 flex flex-col items-center justify-center h-full p-4 text-white">
          <div className="w-full max-w-md py-4 lg:py-10 px-8 lg:px-16 bg-black bg-opacity-80 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Reset Password</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  id="email"
                  className="p-4 text-sm leading-6 bg-slate-500 bg-opacity-30 w-full rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 p-2.5 rounded-md font-semibold w-full"
              >
                {loading ? "Please wait..." : "Send Reset Link"}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link to="/" className="text-sm hover:underline">
                Back to Login
              </Link>
            </div>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
