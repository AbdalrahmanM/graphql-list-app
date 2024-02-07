import React, { useEffect, useState } from 'react';
import './App.css'; 

const Animation = ({ onAnimationComplete }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimationCompleted(true);
      onAnimationComplete(); 
    }, 4000); 

    return () => clearTimeout(animationTimeout);
  }, [onAnimationComplete]);

  return (
    <div className={`animation-container ${animationCompleted ? 'completed' : ''}`}>
      <div className="animation-content">
        <h1>Welcome to Konzek Frontend Developer Assignment</h1>
        <h2>Solved By Abdulrahman Alsamaraie</h2>
      </div>
    </div>
  );
};

export default Animation;
