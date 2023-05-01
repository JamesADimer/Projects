import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <div className={styles.footer} data-testid="footer">
    <small>&copy; 2022 Super Health, Inc.</small>
  </div>
);

export default Footer;
