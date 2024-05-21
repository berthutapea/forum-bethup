import { Leaderboards } from '../components';

const meta = {
  title: 'Components/Leaderboards',
  component: Leaderboards,
};

export default meta;

export const Basic = {
  args: {
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Jone+Doe&background=random',
        },
        score: 5,
      },
    ],
  },
};
