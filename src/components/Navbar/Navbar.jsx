import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import NavbarUser from './NavbarUser';
import { isObjectEmpty } from '../../utils';
import logoForumBetHup from '../../assets/images/logo/logo-forum-BetHup.png';

export default function Navbar({ authUser, onLogout }) {
  return (
    <div className="navbar border-b-2 border-info">
      <div className="flex-1">
        <div className="dropdown">
          <button
            type="button"
            tabIndex="0"
            className="btn btn-ghost lg:hidden"
          >
            <Bars3CenterLeftIcon className="h-6 w-6 bg" />
          </button>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box font-bold z-50">
            {!isObjectEmpty(authUser) && (
              <li>
                <NavbarUser {...authUser} />
              </li>
            )}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leaderboards">Leaderboards</Link>
            </li>
            {!isObjectEmpty(authUser) ? (
              <li>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logoForumBetHup}
              alt="Logo Forum BetHup"
              className="w-12 mr-2"
              title="Logo Forum BetHup"
            />
            <span className="font-bold text-2xl">Forum BetHup</span>
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex gap-1">
        <ul className="menu menu-horizontal font-bold text-lg px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboards">Leaderboards</Link>
          </li>
          {isObjectEmpty(authUser) && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        {!isObjectEmpty(authUser) && (
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={authUser.avatar} alt={authUser.name} />
              </div>
            </button>
            <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box font-bold">
              <li>
                <NavbarUser {...authUser} />
              </li>
              <li>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  authUser: null,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(PropTypes.string.isRequired),
  onLogout: PropTypes.func.isRequired,
};
