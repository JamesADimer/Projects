import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { CartProvider } from '../checkout-page/CartContext';

let container = null;

describe('Header Component Tests', () => {
  // Base setup
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  // component to render
  const component = (
    <BrowserRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </BrowserRouter>
  );

  it('Component renders', () => {
    // Arrange

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getByTestId('homeLink')).toBeInTheDocument();
    expect(screen.getByTestId('patientsLink')).toBeInTheDocument();
  });

  it('Home page loads', () => {
    // Arrange

    // Act
    render(
      component, container
    );
    fireEvent.click(screen.getByTestId('homeLink'));

    // Assert
    expect(document.location.pathname).toBe('/');
  });

  it('Patients page loads', () => {
    // Arrange

    // Act
    render(
      component, container
    );
    fireEvent.click(screen.getByTestId('patientsLink'));

    // Assert
    expect(document.location.pathname).toBe('/patients');
  });
});
