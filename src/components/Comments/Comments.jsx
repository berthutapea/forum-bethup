import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CommentsForm from './CommentsForm';
import Comment from './Comment';
import { asyncCreateComment } from '../../app/states/detailThread/action';

export default function Comments({ threadId, comments }) {
  const dispatch = useDispatch();

  const onCreateComment = async ({ content }) => {
    await dispatch(asyncCreateComment({ threadId, content }));
  };

  return (
    <div className="card border border-info mt-4">
      <div className="card-body">
        <CommentsForm onCreateComment={onCreateComment} />
        {comments.map((comment) => (
          <Comment key={comment.id} threadId={threadId} {...comment} />
        ))}
      </div>
    </div>
  );
}

const commentsShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Comments.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentsShape)).isRequired,
};
