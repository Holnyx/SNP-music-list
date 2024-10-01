import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import starUrl from '/public/img/loupe-icon.svg?url';
import deleteIconUrl from '/public/img/delete-icon.svg?url';

import s from './SearchInput.module.sass';
import cx from 'classnames';

type SearchInputItems = {
  onSearchChange: (query: string) => void;
  clearSearchInput: (payload: string) => void;
  defaultValue: string;
  setSearchTerm:  Dispatch<SetStateAction<string>>;
};

const SearchInput: FC<SearchInputItems> = ({
  onSearchChange,
  clearSearchInput,
  defaultValue,
  setSearchTerm
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.currentTarget.value);
    setInputValue(event.currentTarget.value);
    setSearchTerm(event.currentTarget.value);
    if (!event.currentTarget.value) {
      clearSearchInput('');
      router.push('/');
    } else {
      clearSearchInput(event.currentTarget.value);
    }
  };

  const clearInput = () => {
    setSearchTerm('')
    setInputValue('');
    clearSearchInput('');
    router.push('/');
  };

  useEffect(() => {
    setInputValue(defaultValue);
    clearSearchInput(defaultValue);
  }, [defaultValue]);

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
          <Image
            className={s['clear-icon']}
            src={deleteIconUrl}
            alt={'Clear'}
          />
        </button>
      )}
    </div>
  );
};

export default memo(SearchInput);
