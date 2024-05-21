import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import {
  HandThumbDownIcon as HandThumbDownIconOutline,
  HandThumbUpIcon as HandThumbUpIconOutline,
} from '@heroicons/react/24/outline';
import {
  HandThumbDownIcon as HandThumbDownIconFilled,
  HandThumbUpIcon as HandThumbUpIconFilled,
} from '@heroicons/react/24/solid';
import { asyncToggleVoteCommentThread } from '../../app/states/detailThread/action';
import { Owner } from '../Owner';

export default function Comment({
  threadId,
  id,
  owner,
  content,
  upVotesBy,
  downVotesBy,
  createdAt,
}) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);

  const onToggleVoteComment = ({ voteType, commentId }) => {
    if (authUser) {
      dispatch(
        asyncToggleVoteCommentThread({
          threadId,
          voteType,
          userId: authUser.id,
          commentId,
        }),
      );
    } else {
      alert('Please login first');
    }
  };

  return (
    <div key={id} className="card border border-info">
      <div className="card-body">
        <Owner avatar={owner.avatar} name={owner.name} createdAt={createdAt} />
        <div>{Parser(content)}</div>
        <div className="card-actions">
          <div className="flex items-center">
            <span>{upVotesBy.length}</span>
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => onToggleVoteComment({
                voteType: upVotesBy.includes(authUser?.id) ? 0 : 1,
                commentId: id,
              })}
            >
              {upVotesBy.includes(authUser?.id) ? (
                <HandThumbUpIconFilled className="h-5 w-5" />
              ) : (
                <HandThumbUpIconOutline className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex items-center">
            <span>{downVotesBy.length}</span>
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => onToggleVoteComment({
                voteType: downVotesBy.includes(authUser?.id) ? 0 : -1,
                commentId: id,
              })}
            >
              {downVotesBy.includes(authUser?.id) ? (
                <HandThumbDownIconFilled className="h-5 w-5" />
              ) : (
                <HandThumbDownIconOutline className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  threadId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};
