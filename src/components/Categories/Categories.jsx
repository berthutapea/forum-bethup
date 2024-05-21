import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ categories, keyword, onKeyword }) {
  return (
    <>
      <h1 className="font-bold text-xl">Categories</h1>
      <div className="flex gap-2 mb-4 mt-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-sm gap-2 ${
              category !== keyword?.toLocaleLowerCase() ? 'btn-outline' : ''
            }`}
            onClick={() => onKeyword(category)}
          >
            #
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  keyword: PropTypes.string.isRequired,
  onKeyword: PropTypes.func.isRequired,
};
