import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ThreadForm from './ThreadForm';

describe('ThreadForm component', () => {
  it('should call onCreateThread function when Add Thread button is clicked', async () => {
    const mockOnCreateThread = jest.fn();

    render(<ThreadForm onCreateThread={mockOnCreateThread} />);

    // Menunggu elemen-elemen form terrender sepenuhnya
    const titleInput = await screen.findByPlaceholderText('Title');
    expect(titleInput).toBeInTheDocument();

    // Memasukkan nilai ke input title
    await userEvent.type(titleInput, 'test title');

    // Memastikan elemen input dengan placeholder 'Category' ada
    const categoryInput = await screen.findByPlaceholderText('Category');
    expect(categoryInput).toBeInTheDocument();

    // Memasukkan nilai ke input category
    await userEvent.type(categoryInput, 'test category');

    // Memastikan elemen textarea dengan placeholder 'Body' ada
    const bodyInput = await screen.findByPlaceholderText('Body');
    expect(bodyInput).toBeInTheDocument();

    // Memasukkan nilai ke textarea body
    await userEvent.type(bodyInput, 'test body');

    // Menemukan dan mengklik tombol 'Add Thread'
    const addThreadButton = await screen.findByRole('button', {
      name: 'Add Thread',
    });
    await userEvent.click(addThreadButton);

    // Memastikan bahwa fungsi onCreateThread dipanggil dengan argumen yang sesuai
    await waitFor(() => {
      expect(mockOnCreateThread).toHaveBeenCalledWith({
        title: 'test title',
        category: 'test category',
        body: 'test body',
      });
    });
  });
});
