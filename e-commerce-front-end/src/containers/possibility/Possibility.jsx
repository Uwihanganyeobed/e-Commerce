import React from 'react';
import possibilityImage from '../../assets/Home-Images/fruits_Possibility.png';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h4>Unlock your path to Free Online Trading Services. Request early access today to dive into a world of limitless possibilities, where finding your perfect rental is simpler and more convenient than ever before</h4>
      <h1 className="gradient__text">The possibilities are <br /> beyond your imagination</h1>
      <p>Bid farewell to the frustrations of traditional renting. With Free Online Trading Services, experience joy and convenience in finding your next home. Join us today and embark on this exciting journey with ease</p>
      <h4>Request Early Access to Get Started</h4>
    </div>
  </div>
);

export default Possibility;
