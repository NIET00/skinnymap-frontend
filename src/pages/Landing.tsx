import LoginRegisterPopUp from '../components/LoginPopup';
import logoColor from '../assets/logoColor.png';
import '../styles/Login.css';
import { useState } from 'react';

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="page-container">
      <div className="logo-container">
        <img className="logo" src={logoColor} />
      </div>
      <div className="registration-container">
        <div className="button-centering">
          <button onClick={() => setShowLogin(true)} className="login-button" type="submit">
            Sign in
          </button>
          <button onClick={() => setShowRegister(true)} className="register-button" type="submit">
            Create Account
          </button>
        </div>
      </div>
      {showLogin && (
        <LoginRegisterPopUp
          route="/api/token/"
          method="login"
          onClose={() => setShowLogin(false)}
        />
      )}
      {showRegister && (
        <LoginRegisterPopUp
          route="/api/user/register/"
          method="register"
          onClose={() => setShowRegister(false)}
        />
      )}
    </div>
  );
}

export default Landing;
