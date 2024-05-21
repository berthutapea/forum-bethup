import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAutoFocus, useInput } from '../../hooks';
import { act } from '@testing-library/react';

const CommentInput = forwardRef(({ onChange, value }, ref) => (
  <textarea
    ref={ref}
    value={value}
    onChange={onChange}
    className="textarea textarea-bordered w-full h-24"
    placeholder="Comment"
  />
));

CommentInput.displayName = 'CommentInput';

export default function CommentsForm({ onCreateComment }) {
  const authUser = useSelector((state) => state.authUser);
  const { hash } = useLocation();
  const commentFocus = useAutoFocus(hash);
  const [content, setContent, changeContent] = useInput();

  const handleOnCreateComment = async () => {
    await onCreateComment({ content });
    await act(async () => {
      changeContent('');
    });
  };

  return (
    <>
      <h1 className="font-bold">COMMENT</h1>
      {authUser ? (
        <>
          <CommentInput
            ref={commentFocus}
            value={content}
            onChange={setContent}
          />
          <div className="card-actions mb-2">
            <button
              type="button"
              className="btn"
              onClick={handleOnCreateComment}
            >
              Post Comment
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link className="link text-info" to="/login">
            <strong>Login</strong>
          </Link>{' '}
          to post a comment
        </div>
      )}
    </>
  );
}

CommentInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

CommentsForm.propTypes = {
  onCreateComment: PropTypes.func.isRequired,
};
