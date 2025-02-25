import React, { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy-loaded components
const Dashheader = lazy(() => import('../private/dashheader.jsx'));
const Dashboard = lazy(() => import('../private/dashboard.jsx'));
const AddPost = lazy(() => import('../private/addpost.jsx'));
const Profile = lazy(() => import('../private/userprofile.jsx'));
const Managepin = lazy(() => import('../private/managepin.jsx'));
const Foot = lazy(() => import('../../rct/footer.jsx'));

function Feature() {
  const location = useLocation();
  let content;

  if (location.pathname === '/dashboard') {
    content = <Dashboard />;
  } else if (location.pathname === '/addpost') {
    content = <AddPost />;
  }else if (location.pathname === '/profile') {
      content = <Profile/>;
    }else if (location.pathname === '/managepin') {
      content = <Managepin/>;
  } else {
    content = <div>404 Page Not Found</div>;
  }

  return (
    <div className="page-container">
      {/* Header */}
      <Dashheader />

      {/* Main Content */}
      <div className="main-content">
        <Suspense fallback={<div>Loading...</div>}>
          {content}
        </Suspense>
      </div>

   <Foot/>
    </div>
  );
}

export default Feature;
