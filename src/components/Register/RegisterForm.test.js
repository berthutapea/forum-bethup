import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';
import '@testing-library/jest-dom';

/**
 * test scenario
 *
 * - RegisterForm component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

describe('RegisterForm component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    await act(async () => render(<RegisterForm onRegister={() => {}} />));
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await act(async () => userEvent.type(nameInput, 'emailtest'));

    // Assert
    expect(nameInput).toHaveValue('emailtest');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    await act(async () => render(<RegisterForm onRegister={() => {}} />));
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));

    // Assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    await act(async () => render(<RegisterForm onRegister={() => {}} />));
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn();
    await act(async () => render(<RegisterForm onRegister={mockRegister} />));
    const nameInput = await screen.getByPlaceholderText('Name');
    await act(async () => userEvent.type(nameInput, 'emailtest'));
    const emailInput = await screen.getByPlaceholderText('Email');
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));
    const passwordInput = await screen.getByPlaceholderText('Password');
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });

    // Action
    await act(async () => userEvent.click(registerButton));

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'emailtest',
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});
