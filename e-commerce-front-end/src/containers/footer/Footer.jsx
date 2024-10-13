import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import gpt3Logo from "../../logo.svg";
import "./footer.css";


const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">
        Ready to Embrace the Future Ahead of the Curve?
      </h1>
    </div>
    <div className="gpt3__footer-btn">
      <p>Request Early Access</p>
    </div>
    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>UR-K12 182 DK Biryogo</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Social Links</h4>
        <a href="https://twitter.com/ObedUwihan12452">
        {" "}
          <FaXTwitter />
        </a>
        <a href="https://github.com/Uwihanganyeobed">

          {" "}
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/uwihanganye-obed-ba7a90266/">
          <FaLinkedin />
        </a>
        <a href="https://www.youtube.com/channel/UC4Wej-3nTQ3XMUS94TmbJ_A">
          {" "}
          <FaYoutube />
        </a>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        {/* <Company/> */}
        <p>Terms & Conditions </p>
        {/* <TermsConditions/> */}
        <p>Privacy Policy</p>
        {/* <NoticePrivacy/> */}
        <p>Contact Us</p>
        {/* <ContactUs/> */}
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>UR-K12 182 DK Biryogo</p>
        <p>085-132567</p>
        <p>KFLS@rental.com</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 KFLS. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
