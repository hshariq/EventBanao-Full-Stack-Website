import React from 'react'

import { Helmet } from 'react-helmet'

import './loginLandlord.css'

const LoginLandlord = (props) => {
  return (
    <div className="login-landlord-container">
      <div className="login-landlord-login-landlord">
        <img
          src="/playground_assets/dalle20230413185114113-bklj-1100h.png"
          alt="DALLE20230413185114113"
          className="login-landlord-dalle2023041318511"
        />
        <div className="login-landlord-hdeading">
          <span className="login-landlord-text">
            <span>
              Login as Landlord
            </span>
          </span>
          <img
            src="/playground_assets/line14113-p3sl.svg"
            alt="Line14113"
            className="login-landlord-line1"
          />
        </div>
        <div className="login-landlord-kaam">
          <img
            src="/playground_assets/signupbuttonbutton4315-uj8.svg"
            alt="SignUpButtonbutton4315"
            className="login-landlord-sign-up-buttonbutton"
          />
          <span className="login-landlord-text02">
            <span> Sign Up</span>
          </span>
          <img
            src="/playground_assets/loginbuttonbutton4114-iftf-200h.png"
            alt="LoginButtonbutton4114"
            className="login-landlord-login-buttonbutton"
          />
          <span className="login-landlord-text04">
            <span>
              <span>LOGIN</span>
              <br></br>
              <span></span>
            </span>
          </span>
          <img
            src="/playground_assets/passwordinputinput4114-d3a7-200h.png"
            alt="PasswordInputinput4114"
            className="login-landlord-password-inputinput"
          />
          <span className="login-landlord-text09">
            <span>Not registered?</span>
          </span>
          <span className="login-landlord-text11">
            <span>password</span>
          </span>
          <img
            src="/playground_assets/emailinput4113-pw0h-200h.png"
            alt="Emailinput4113"
            className="login-landlord-emailinput"
          />
          <span className="login-landlord-text13">
            <span>email</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginLandlord
