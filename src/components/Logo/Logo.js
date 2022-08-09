import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <img className="logo__img" src={logo} alt="Логотип"></img>
    </Link>
  );
}   