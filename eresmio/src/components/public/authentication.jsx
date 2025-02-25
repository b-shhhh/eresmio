import React, { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy-loaded components
const Signup = lazy(() => import('../private/signup.jsx'));
const Login = lazy(() => import('../private/login.jsx'));
const AuthHeader = lazy(() => import('../../rct/header.jsx'));
const Foot = lazy(() => import('../../rct/footer.jsx'));
const Landing = lazy(()=>import('../public/landingpage.jsx'));
function Authentication({setToken}) {
    const location = useLocation();
  
    return (
      <Suspense fallback={<div>Loading...</div>}>
          <AuthHeader />
          
        {
        location.pathname==='/'?(
            <>
            <Landing/>
            </>
        ):location.pathname === '/signup' ? (
          <>
            <Signup />
          </>
        ) : location.pathname === '/login' ? (
          <>
            <Login/>
          </>
           ) : (
            <div>404 Page Not Found</div>
          )}
          <Foot></Foot>
        </Suspense>
      );
    }
    
    export default Authentication;
    