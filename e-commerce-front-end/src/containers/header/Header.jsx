import React from 'react';
import people from '../../assets/Home-Images/people.png';
// import motivePic from '../../assets/Home-Images/main_Image.png';
import './header.css';
// import admin from '../../assets/Admin.jpg'

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Unlock the door to your dream Items – Trade with free <i>Commission</i>!</h1>
      <p>Embark on a Trade-free journey with our platform, where finding your ideal home is not just a dream but a reality. Discover the joy of hassle-free living, as we bring you exclusive offers on affordable luxury spaces. Your perfect space awaits – experience the freedom of living without the burden of monthly Trade payments</p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="gpt3__header-content__people">
        <img src={people} alt='' />
        <p>1.5K people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      {/* <img src={motivePic} alt='' /> */}
      {/* <img src={admin} alt='' /> */}
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" 
  viewBox="-25 -25 250 250" class="rotate"> 
  <defs>
   <radialGradient id="rgrad" cx="50%" cy="50%" r="50%" >
<stop offset="0%" style={{"stop-color": "#00FF84", "stop-opacity": 1.00}} />
<stop offset="100%" style={{"stop-color": "#008EE6", "stop-opacity": 1.00}} />
   </radialGradient>
  </defs>
  <path d="M76.56691566898776 2.7843090919183595 C40.40679550592612 -3.692319448073185 -3.6094611734637034 95.3746579865643 4.958084249204191 131.09717431566145 C12.140731011546961 161.0453337470739 81.27842630324892 216.2828174493933 107.25350853863523 199.73658613507857 C149.28276660554957 172.96378058080776 125.61846736895077 11.569918161751488 76.56691566898776 2.7843090919183595Z" stroke="none" fill="url(#rgrad)"  />
      </svg>
    </div>
  </div>
);

export default Header;
