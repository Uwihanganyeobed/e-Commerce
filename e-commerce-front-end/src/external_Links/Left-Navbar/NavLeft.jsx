import { useState } from "react";
import "./nav-Left.css";
import { AiOutlineCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavLeft = () => {
  const [userName, setUserName]=useState("Uwihanganye Obed")
  return (
      <div className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header main-canvas">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <div className="canvas__heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <g clipPath="url(#clip0_76_5)">
                  <path
                    d="M25 0C18.125 0 12.5 7 12.5 15.625C12.5 24.25 18.125 31.25 25 31.25C31.875 31.25 37.5 24.25 37.5 15.625C37.5 7 31.875 0 25 0ZM11.9375 31.25C5.3125 31.5625 0 37 0 43.75V50H50V43.75C50 37 44.75 31.5625 38.0625 31.25C34.6875 35.0625 30.0625 37.5 25 37.5C19.9375 37.5 15.3125 35.0625 11.9375 31.25Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_76_5">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h1>Hello, {userName}</h1>
            </div>
          </h5>
          <button
          style={{ backgroundColor: 'red'}}
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="canvas__main">
            <div className="canvass__electronics">
              <h2>Digital_Devices</h2>
              <div className="mobile">
                <a href="#">
                  <p>KFLS Appstore <AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>New Generation Cars<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="lap">
                <a
                  href="
                "
                >
                  <p>Models<AiOutlineCaretRight /></p>
                </a>
              </div>
              <hr />
            </div>        
            <div className="canvass__department">
              <h2>Shop by Department</h2>
              <div className="mobile">
                <a href="#">
                  <p>Electronics<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>Computers<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>SmartHome<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>Automotive<AiOutlineCaretRight /></p>
                </a>
              </div>
              <hr/>
            </div>
            <div className="canvass__department">
              <h2>Fashion Styles</h2>
              <div className="mobile">
                <a href="#">
                  <p>Women's Fashion<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>Beauty and Personal Care<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>Teen's Fashion<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>Video Games<AiOutlineCaretRight /></p>
                </a>
              </div>
              <div className="smart">
                <a href="">
                  <p>Other Services<AiOutlineCaretRight /></p>
                </a>
              </div>
              <hr/>
            </div>
            <div className="canvass__settings">
              <h2>Help & Settings</h2>
              <div className="mobile">
                <a href="#">
                  <Link to='/login'><p>Your Account<AiOutlineCaretRight /></p></Link>
                </a>
              </div>
              <div className="smart">
                <p>
                  <a href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47"
                      height="35"
                      viewBox="0 0 47 35"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_76_70)">
                        <path
                          d="M47 26.25C47 27.2814 46.4498 28.2705 45.4704 28.9998C44.4911 29.7291 43.1628 30.1389 41.7778 30.1389H5.22222C3.8372 30.1389 2.50891 29.7291 1.52955 28.9998C0.550197 28.2705 0 27.2814 0 26.25V8.74997C0 7.71858 0.550197 6.72942 1.52955 6.00011C2.50891 5.2708 3.8372 4.86108 5.22222 4.86108H41.7778C43.1628 4.86108 44.4911 5.2708 45.4704 6.00011C46.4498 6.72942 47 7.71858 47 8.74997V26.25Z"
                          fill="#20603D"
                        />
                        <path
                          d="M0 18.4722H47V25.2777H0V18.4722Z"
                          fill="#FAD201"
                        />
                        <path
                          d="M41.7778 4.86108H5.22222C3.8372 4.86108 2.50891 5.2708 1.52955 6.00011C0.550197 6.72942 0 7.71858 0 8.74997L0 20.4166H47V8.74997C47 7.71858 46.4498 6.72942 45.4704 6.00011C44.4911 5.2708 43.1628 4.86108 41.7778 4.86108Z"
                          fill="#00A1DE"
                        />
                        <path
                          d="M33.9444 4.86108L34.6259 8.78303L36.6469 5.12553L35.9433 9.04553L39.1667 5.90331L37.1235 9.554L41.3287 7.139L38.087 10.2715L42.9906 8.74997L38.7685 11.1504L44.0338 10.6254L39.1223 12.1304L44.3889 12.6389L39.1223 13.1473L44.0338 14.6514L38.7685 14.1273L42.9906 16.5278L38.087 15.0062L41.3287 18.1387L37.1235 15.7237L39.1667 19.3754L35.9433 16.2312L36.6469 20.1522L34.6259 16.4947L33.9444 20.4166L33.2629 16.4947L31.2406 20.1522L31.9456 16.2312L28.7222 19.3754L30.7654 15.7237L26.5602 18.1387L29.8006 15.0062L24.8982 16.5278L29.1191 14.1273L23.8551 14.6514L28.7653 13.1473L23.5 12.6389L28.7653 12.1304L23.8551 10.6254L29.1191 11.1504L24.8982 8.74997L29.8006 10.2715L26.5602 7.139L30.7654 9.554L28.7222 5.90331L31.9456 9.04553L31.2406 5.12553L33.2629 8.78303L33.9444 4.86108Z"
                          fill="#FAD201"
                        />
                        <path
                          d="M33.9444 16.5278C36.8285 16.5278 39.1666 14.7867 39.1666 12.6389C39.1666 10.4911 36.8285 8.75 33.9444 8.75C31.0602 8.75 28.7222 10.4911 28.7222 12.6389C28.7222 14.7867 31.0602 16.5278 33.9444 16.5278Z"
                          fill="#00A1DE"
                        />
                        <path
                          d="M33.9445 15.5555C36.1076 15.5555 37.8612 14.2497 37.8612 12.6388C37.8612 11.028 36.1076 9.72217 33.9445 9.72217C31.7814 9.72217 30.0278 11.028 30.0278 12.6388C30.0278 14.2497 31.7814 15.5555 33.9445 15.5555Z"
                          fill="#FAD201"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_76_70">
                          <rect width="47" height="35" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Rwanda
                    <AiOutlineCaretRight />
                  </a>
                </p>
              </div>
              <div className="lap">
                <a href="#">
                  <Link to='/login'><p>Sign Out<AiOutlineCaretRight /></p></Link>
                </a>
              </div>
            </div>    
             
          </ul>
        </div>
      </div>
  );
};

export default NavLeft;
