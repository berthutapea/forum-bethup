import React from 'react';
import PropTypes from 'prop-types';

export default function Leaderboards({ leaderboards }) {
  return (
    <div className="">
      <div className="card-body">
        <h1 className="font-bold text-xl">Leaderboards</h1>
        <div className="overflow-x-auto w-full mt-4">
          <table className="table w-full">
            <thead>
              <tr className="text-lg">
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboards.map((leaderboard) => (
                <tr key={leaderboard.user.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={leaderboard.user.avatar}
                            alt={leaderboard.user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{leaderboard.user.name}</div>
                        <div className="text-sm opacity-50 text-info">
                          {leaderboard.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{leaderboard.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const leaderboardsShape = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  score: PropTypes.number.isRequired,
};

Leaderboards.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardsShape))
    .isRequired,
};
