import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in');
    const reveal = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // reveal on load

    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="animate-text">About Us</h1>
        <p className="animate-subtext">
          Delicious Food, Delivered Fast – Made With Love & Quality.
        </p>
      </div>

      <div className="about-content">
        <div className="about-section fade-in">
          <h2>Our Mission</h2>
          <p>
            We're committed to redefining food delivery by combining fresh ingredients,
            fast service, and excellent customer satisfaction.
          </p>
        </div>

        <div className="about-section fade-in">
          <h2>What Makes Us Special?</h2>
          <ul>
            <li>💡 Innovative Recipes</li>
            <li>🛵 Lightning Fast Delivery</li>
            <li>💖 Customer First Approach</li>
            <li>🌿 100% Hygiene Guarantee</li>
          </ul>
        </div>

        <div className="about-section fade-in">
          <h2>Our Story</h2>
          <p>
            Launched in 2025, we started as a small kitchen with big dreams. Today, we
            serve thousands of customers across India with pride, passion, and purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
