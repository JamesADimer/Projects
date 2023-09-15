import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

let container = null;

describe('Footer Component Tests', () => {
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
  const component = <Footer />;

  it('Component renders', () => {
    // Arrange

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getByTestId('footer')).toHaveTextContent('2022 Super Health, Inc.');
  });
});
