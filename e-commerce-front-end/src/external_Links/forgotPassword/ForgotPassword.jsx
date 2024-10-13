import { Link } from "react-router-dom";
import "./forgot.css";
const ForgotPassword = () => {
  return (
    <div className="chpass__main">
      <div className="chpass__main-header">
         <h1>Change Password</h1>
      </div>
      <div className="chpass__main-inputs">
         <label className="label-1" htmlFor="">Old Password</label>
         <input className="input-1" type="password" />

         <label className="label-2" htmlFor="">New Password</label>
         <input className="input-2" type="password" />

         <label className="label-3" htmlFor="">Re-Enter New Password</label>
         <input className="input-3" type="password" />
      </div>
      <div className="chpass__main-footer">
         <p>Forgot password</p>
         <Link to='/'><button>Change Password</button></Link>
      </div>
      
    </div>
  )
}

export default ForgotPassword