import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";

function UserProfilePage() {
  return (
    <div>
      <Navbar />
      <UserProfile />
      <Footer />
    </div>
  );
}

export default UserProfilePage;
