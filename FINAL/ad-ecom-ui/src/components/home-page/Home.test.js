import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

let container = null;

describe('Home Component Tests', () => {
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
  const component = <Home />;

  it('Component renders', () => {
    // Arrange

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getByTestId('home')).toHaveTextContent('Home Page!');
  });
});
