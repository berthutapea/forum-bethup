import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import '@testing-library/jest-dom';

/**
 * test scenario
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

describe('LoginForm component', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    await act(async () => render(<LoginForm onLogin={() => {}} />));
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));

    // Assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    await act(async () => render(<LoginForm onLogin={() => {}} />));
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = jest.fn();
    await act(async () => render(<LoginForm onLogin={mockLogin} />));
    const emailInput = await screen.getByPlaceholderText('Email');
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));
    const passwordInput = await screen.getByPlaceholderText('Password');
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await act(async () => userEvent.click(loginButton));

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});
