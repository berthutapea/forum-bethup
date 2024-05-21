/* eslint-disable react/react-in-jsx-scope */
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const WithoutAuthUser = {};

export const WithAuthUser = {
  args: {
    authUser: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    },
  },
};
