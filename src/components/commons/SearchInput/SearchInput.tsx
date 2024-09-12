import React, { ChangeEvent, FC, memo } from 'react';

import Image from 'next/image';
import starUrl from '/public/img/loupe-icon.svg?url';

import s from './SearchInput.module.sass';
import cx from 'classnames';

type SearchInputItems = {
  onSearchChange: (query: string) => void;
};

const SearchInput: FC<SearchInputItems> = ({ onSearchChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.currentTarget.value);
  };

  return (
    <div className={s.container}>
      <label
        htmlFor="search"
        className={s.icon}
      >
        <Image
          src={starUrl}
          alt={'loupe-icon'}
        />
      </label>
      <input
        id="search"
        className={s.input}
        type="text"
        placeholder="Search for new music, news, artists..."
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default memo(SearchInput);
