import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../store/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  const handleLogoClick = () => {
    navigate("/browse");
  };
  return (
    <div className="absolute w-full flex justify-between items-center px-2 sm:px-8 lg:px-20 xl:px-32 py-1 z-20">
      <img
        alt="logo"
        className="w-32 sm:w-40 md:w-48 py-2 cursor-pointer"
        onClick={handleLogoClick}
        src="/img/logo.png"
      />
      {user && (
        <div className="flex pr-2 gap-x-8 max-sm:gap-x-4 md:gap-x-14 text-white font-medium max-sm:text-xs md:text-lg max-md:pt-1">
          <Link to="/browse" className="hover:text-red-500">
            Home
          </Link>
          <Link to="/search" className="hover:text-red-500">
            Search
          </Link>
          <Link className="hover:text-red-500" onClick={handleSignout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
