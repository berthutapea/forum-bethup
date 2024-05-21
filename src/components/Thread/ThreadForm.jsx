import React from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../../hooks';

export default function ThreadForm({ onCreateThread }) {
  const [title, setTitle, changeTitle] = useInput('');
  const [category, setCategory, changeCategory] = useInput('');
  const [body, setBody, changeBody] = useInput('');

  const handleOnCreateThread = async () => {
    await onCreateThread({ title, body, category });
    changeTitle('');
    changeCategory('');
    changeBody('');
  };

  return (
    <>
      <div className="flex flex-col gap-3 py-4">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={setTitle}
        />
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full"
          value={category}
          onChange={setCategory}
        />
        <textarea
          value={body}
          onChange={setBody}
          className="textarea textarea-bordered w-full h-24"
          placeholder="Body"
        />
      </div>
      <div className="modal-action justify-center">
        <button type="button" className="btn" onClick={handleOnCreateThread}>
          Add Thread
        </button>
      </div>
    </>
  );
}

ThreadForm.propTypes = {
  onCreateThread: PropTypes.func.isRequired,
};
