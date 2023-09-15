// import React from 'react';
// import { toast } from 'react-toastify';
// import { unmountComponentAtNode } from 'react-dom';
// import { render, screen } from '@testing-library/reat';
// import { makePurchase } from './CheckoutPageService';
// import CheckoutPage from './CheckoutPage';

// Mock purchase
jest.mock('./CheckoutPageService');
let container = null;

describe('Checkout Page Toast Tests', () => {
  // Base set up
  beforeEach(() => {
    // set up DOM element as render
    container = document.createElement('div');
    document.body.appendChild(container);
  });
});
