import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoColor from '../assets/logoColor.png';
import '../styles/Popup.css';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

interface LoginRegisterPopUpProps {
  route: string;
  method: 'login' | 'register';
  onClose: () => void;
}

const LoginRegisterPopUp = ({ route, method, onClose }: LoginRegisterPopUpProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Log in' : 'Register';
  const title = method === 'login' ? 'Sign in to SkinnyMap' : 'Create your account';

  const LoginRegisterPopUpRef = useRef<HTMLInputElement>(null);

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (LoginRegisterPopUpRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/home');
      } else {
        navigate('/');
        onClose();
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={LoginRegisterPopUpRef} onClick={closePopup} className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="exit-button">
          <X size={32} color="#cae9ff" />
        </button>
        <div className="text-and-logo">
          <h2 className="skinnymap-sign-in">{title}</h2>
          <img id="logo" src={logoColor} />
        </div>

        <form onSubmit={handleSubmit} className="form-container" action="">
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="form-button" type="submit">
            {name}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterPopUp;
