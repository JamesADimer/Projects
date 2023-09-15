import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/SuperHealthLogo.png';
import styles from './Header.module.css';
import '../home-page/Home';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <div className={styles.header}>
    <div className="navigation">
      <div>
        <Link className={styles.logoContainer} to="/" data-testid="homeLink">
          <img src={logo} style={{ marginTop: '8px', marginLeft: '10px' }} width="220" height="50" alt="Logo" />
        </Link>
      </div>
    </div>
    <div>
      <Link className={styles.viewContainer} to="/patients" data-testid="patientsLink">
        <button type="submit" style={{ marginLeft: '80px' }} className={styles.btnView}>View Patients</button>
      </Link>
    </div>
  </div>
);

export default Header;
