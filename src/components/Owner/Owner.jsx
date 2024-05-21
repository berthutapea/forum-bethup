import React from 'react';
import PropTypes from 'prop-types';
import postedAt from '../../utils/postedAt';

export default function Owner({ name, avatar, createdAt }) {
  return (
    <div className="flex items-center gap-2 my-1">
      <div className="avatar">
        <div className="w-10 rounded-xl">
          <img src={avatar} alt={name} />
        </div>
      </div>
      <div className="text-sm">
        <strong>{name}</strong>
        <p>{postedAt(createdAt)}</p>
      </div>
    </div>
  );
}

Owner.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
