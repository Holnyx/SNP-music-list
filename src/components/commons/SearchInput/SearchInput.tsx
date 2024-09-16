import React, { ChangeEvent, FC, memo, useState } from 'react';

import router from 'next/router';
import Image from 'next/image';
import starUrl from '/public/img/loupe-icon.svg?url';

import s from './SearchInput.module.sass';
import cx from 'classnames';

type SearchInputItems = {
  onSearchChange: (query: string) => void;
  clearSearchInput: (payload: string) => void;
};

const SearchInput: FC<SearchInputItems> = ({
  onSearchChange,
  clearSearchInput,
}) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.currentTarget.value);
    setInputValue(event.currentTarget.value);
    if (event.target.value === '') {
      router.push('/');
      setInputValue('');
      clearSearchInput('');
    }
  };

  const clearInput = () => {
    setInputValue('');
    clearSearchInput('');
    router.push('/');
  };

  return (
    <div className={s['container']}>
      <label
        htmlFor="search"
        className={s.icon}
      >
        <Image
          src={starUrl}
          alt={'loupe-icon'}
          priority
        />
      </label>
      <input
        id="search"
        className={s.input}
        type="text"
        placeholder="Search for new music, news, artists..."
        onChange={handleChange}
        value={inputValue}
      ></input>

      {inputValue && (
        <button
          className={s['clear-button']}
          title="Cancel"
          onClick={clearInput}
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={s['delete-img']}
              d="M6.74367 7.21198L19.573 19.8808L20.2458 19.1994L7.41646 6.53066L6.74367 7.21198ZM6.5418 19.784L7.24883 20.4822L20.7046 6.85577L19.9976 6.15759L6.5418 19.784Z"
              fill="#c4c4c4"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default memo(SearchInput);
