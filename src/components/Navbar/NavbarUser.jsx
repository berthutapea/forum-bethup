import React from 'react';
import PropTypes from 'prop-types';

export default function NavbarUser({ name, email, avatar }) {
  return (
    <div className="flex items-center gap-2 my-1">
      <div className="avatar">
        <div className="w-10 rounded-xl">
          <img src={avatar} alt={name} />
        </div>
      </div>
      <div className="text-sm">
        <strong>{name}</strong>
        <p>{email}</p>
      </div>
    </div>

  );
}

NavbarUser.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
