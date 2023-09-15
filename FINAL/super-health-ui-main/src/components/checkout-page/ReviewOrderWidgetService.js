import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ReviewOrderWidget.module.css';
/**
 * converts a price to a formatted string
 * @param {number} price
 * @returns {string} formatted price
 */
export const toPrice = (price) => `$${price.toFixed(2)}`;

/**
 * Gets the subtotal of an order
 * @param {Object []} products
 * @returns Number
 */
export const getSubtotal = (products) => {
  if (products.length !== null) {
    return toPrice(products.reduce(
      (acc, item) => acc + (item.quantity * item.price), 0
    ));
  }
  throw new Error('No products found');
};
export const emptyCart = (products) => {
  if (getSubtotal !== 0) {
    return (
      <div className={styles.emptyCartMessage}>
        <p>
          Your cart is empty. Click
          <span> </span>
          <Link to="/">here</Link>
          <span> </span>
          to shop.
        </p>
      </div>
    );
  }
  return toPrice(products.reduce(
    (acc, item) => acc + (item.quantity * item.price), 0
  ));
};
