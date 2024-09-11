import React, { memo } from 'react';

import Image from 'next/image';
import starUrl from '/public/img/loupe-icon.svg?url';

import s from './SearchInput.module.sass';
import cx from 'classnames';

const SearchInput = () => {
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
      ></input>
    </div>
  );
};

export default memo(SearchInput);
