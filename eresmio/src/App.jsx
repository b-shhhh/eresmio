
   
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Correct import paths based on the new folder structure
const Header = React.lazy(() => import("./rct/header.jsx"));
const Footer = React.lazy(() => import("./rct/footer.jsx"));
const LandingPage = React.lazy(() => import("./components/public/landingpage.jsx"));
const Login = React.lazy(() => import("./components/private/login.jsx"));
const Signup = React.lazy(() => import("./components/private/signup.jsx"));
const Dashboard = React.lazy(() => import("./components/private/dashboard.jsx"));
const Auth= React.lazy(()=>import("./components/public/authentication.jsx"));
const Addpost=React.lazy(() => import("./components/private/addpost.jsx"));
const Profile=React.lazy(() => import("./components/private/userprofile.jsx"));
const Managepin=React.lazy(() => import("./components/private/managepin.jsx"));
const Feature= React.lazy(()=>import("./components/private/feature.jsx"));


function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/dashboard" element={<Feature/>} />
          <Route path="/addpost" element={<Feature/>} />
          <Route path="/profile" element={<Feature/>} />
          <Route path="/managepin" element={<Feature/>} />

        </Routes>
        </Router>
      </Suspense>

  );
}

export default App;
