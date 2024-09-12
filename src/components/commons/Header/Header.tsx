import React, { Dispatch, FC, memo, SetStateAction, useCallback } from 'react';

import SearchInput from '../SearchInput/SearchInput';
import { useActionWithPayload } from '@/hooks/useAction';
import { setSearchQueryAC } from '@/store/actions';

import s from './Header.module.sass';
import cx from 'classnames';

type HeaderItems = {
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header: FC<HeaderItems> = ({ setMenuIsOpen }) => {
  const setSearchQuery = useActionWithPayload(setSearchQueryAC);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  return (
    <div className={s.header}>
      <button
        className={s.button}
        onClick={() => setMenuIsOpen(prevValue => !prevValue)}
      >
        <svg
          className={s.color}
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2_489)">
            <path
              d="M9.0238 16.5425H25.1049V15.6885H9.0238V16.5425ZM16.7743 24.6475H17.6605V7.56738H16.7743V24.6475Z"
              fill="#FF9900"
            />
          </g>
          <rect
            x="0.499878"
            y="0.5"
            width="33"
            height="33"
            rx="5.5"
            stroke="#FF9900"
          />
          <defs>
            <clipPath id="clip0_2_489">
              <rect
                x="-0.00012207"
                width="34"
                height="34"
                rx="6"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <SearchInput onSearchChange={handleSearchChange} />
    </div>
  );
};

export default memo(Header);
