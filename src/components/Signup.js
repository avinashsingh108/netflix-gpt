import React from "react";
import Header from "./Header";
import FloatingLabelInput from "./FloatingLabelInput";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <main className="relative h-screen overflow-hidden">
      <Header />
      <div>
        <img
          className="absolute object-cover"
          alt="Background scene for Netflix signup"
          role="presentation"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/151f3e1e-b2c9-4626-afcd-6b39d0b2694f/web/IN-en-20241028-TRIFECTA-perspective_bce9a321-39cb-4cce-8ba6-02dab4c72e53_large.jpg"
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <form className="absolute w-[30%] flex flex-col gap-y-4 rounded bg-black bg-opacity-70 text-white py-10 px-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <FloatingLabelInput label="Full Name" type="text" />
        <FloatingLabelInput label="Email or Mobile number" type="text" />
        <FloatingLabelInput label="Password" type="password" />
        <button className="bg-red-600 hover:bg-red-700 p-2.5 rounded-sm font-semibold">
          Sign Up
        </button>
        <h4 className="text-gray-400 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline cursor-pointer">
            Sign in now.
          </Link>
        </h4>
      </form>
    </main>
  );
};

export default Signup;
