import React, { memo } from 'react';

import s from './SearchInput.module.sass';
import cx from 'classnames';

const SearchInput = () => {
  return (
    <div className={s.container}>
      <label
        htmlFor="search"
        className={s.icon}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.012 11H12.222L11.942 10.73C12.922 9.59 13.512 8.11 13.512 6.5C13.512 2.91 10.602 0 7.01196 0C3.42196 0 0.511963 2.91 0.511963 6.5C0.511963 10.09 3.42196 13 7.01196 13C8.62196 13 10.102 12.41 11.242 11.43L11.512 11.71V12.5L16.512 17.49L18.002 16L13.012 11V11ZM7.01196 11C4.52196 11 2.51196 8.99 2.51196 6.5C2.51196 4.01 4.52196 2 7.01196 2C9.50196 2 11.512 4.01 11.512 6.5C11.512 8.99 9.50196 11 7.01196 11Z"
            fill="#C4C4C4"
          />
        </svg>
      </label>
      <input
        id="search"
        className={s.input}
        type="text"
        placeholder="Search for new music, news, artists..."
      ></input>
    </div>
  );
};

export default memo(SearchInput);
