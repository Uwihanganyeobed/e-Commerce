import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [

  {
    title: 'Instant Access to Trusted Rentals',
    text: 'Gain immediate access to trusted Trading listings. Our platform ensures instant trust and reliability, providing you with a seamless experience in finding your perfect Trading.'
  },
  {
    title: 'Engage with Trading Free Opportunities',
    text: 'Become actively engaged in the Trading market. Our platform offers uncommonly effective assistance, enabling you to connect with Trading opportunities that suit your needs.'
  },
  {
    title: 'Craft Your Trading Free Journey',
    text: 'Craft your Trading journey with precision. Our platform allows you to create personalized searches and messages, ensuring that every step of your Trading process is tailored to your preferences.'
  },
  {
    title: 'Navigate the Trading Free Landscape',
    text: 'Navigate the Trading landscape with confidence. Our platform empowers you to navigate Trading laws and regulations effortlessly, ensuring a smooth and successful Trading experience.'
  }
  
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
