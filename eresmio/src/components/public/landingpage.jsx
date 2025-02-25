import React from 'react';
import "../css/landing.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Video Section */}
      <div className="video-section">
        <video autoPlay loop muted className="background-video">
          <source src="../public/resources/yasminnnn.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay">
          <div className="video-content">YOUR ULTIMATE FASHION INSPIRATION HUB!!!</div>
        </div>
        </div>

 
      {/* Featured Section */}
      <section className="featured-section">
        <h2>Featured Collections</h2>
        <div className="featured-content">
          <div className="featured-item">
            <img src="../public/resources/nisha.png" alt="Collection 1" />
            <h3>Summer Vibes</h3>
          </div>
          <div className="featured-item">
            <img src="../public/resources/sitoshna.png" alt="Collection 2" />
            <h3>Timeless Elegance</h3>
          </div>
          <div className="featured-item">
            <img src="../public/resources/anisha.png" alt="Collection 3" />
            <h3>Elegant</h3>
            </div>
            <div className="featured-item">
            <img src="../public/resources/sharon.png" alt="Collection 4" />
            <h3>Casual Preppy</h3>
          </div>
          <div className="featured-item">
            <img src="../public/resources/bohochic.png" alt="Collection 3" />
            <h3> Bohochic</h3>
            </div>
            <div className="featured-item">
            <img src="../public/resources/oldmoney.png" alt="Collection 3" />
            <h3> Oldmoney</h3>
            </div>

        </div>
      </section>
      <section className="cta">
  <h2>Ready to get started?</h2>
  <p>
   <a href="/signup">Signup</a> today and find your perfect style!!
  </p>
</section>

    </div>
  );
};

export default LandingPage;
