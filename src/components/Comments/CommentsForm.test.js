import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentsForm from './CommentsForm';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/renderWithProviders';

/**
 * test scenario
 *
 * - CommentsForm component
 *   - should handle comment typing correctly
 *   - should call onCreateComment function when Post Comments button is clicked
 */

const fakeAuthUser = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('CommentsForm component', () => {
  it('should handle comment typing correctly', async () => {
    // Arrange
    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <CommentsForm onCreateComment={() => {}} />
        </MemoryRouter>,
        {
          preloadedState: {
            authUser: fakeAuthUser,
          },
        }
      );
    });

    const commentInput = await screen.findByPlaceholderText('Comment');

    // Action
    await act(async () => {
      await userEvent.type(commentInput, 'Hello World!');
    });

    // Assert
    expect(commentInput).toHaveValue('Hello World!');
  });

  it('should call onCreateComment function when Post Comments button is clicked', async () => {
    // Arrange
    const mockOnCreateComment = jest.fn();

    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <CommentsForm onCreateComment={mockOnCreateComment} />
        </MemoryRouter>,
        {
          preloadedState: {
            authUser: fakeAuthUser,
          },
        }
      );
    });

    const commentInput = await screen.findByPlaceholderText('Comment');

    await act(async () => {
      await userEvent.type(commentInput, 'Hello World!');
    });

    const commentButton = await screen.findByRole('button', {
      name: 'Post Comment',
    });

    // Action
    await act(async () => {
      await userEvent.click(commentButton);
    });

    // Assert
    expect(mockOnCreateComment).toBeCalledWith({ content: 'Hello World!' });
  });
});
