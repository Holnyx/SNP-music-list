import React, { Dispatch, FC, memo, SetStateAction, useCallback } from 'react';

import { useRouter } from 'next/router';

import SearchInput from '../SearchInput/SearchInput';
import { useActionWithPayload } from '@/hooks/useAction';
import { setSearchQueryAC } from '@/store/actions';

import Image from 'next/image';
import starUrlBack from '/public/img/go-back-icon.svg?url';
import starUrlAdd from '/public/img/add-music-icon.svg?url';

import s from './Header.module.sass';
import cx from 'classnames';

type HeaderItems = {
  canGoBack?: boolean;
  pathMusic?: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header: FC<HeaderItems> = ({ setMenuIsOpen, canGoBack, pathMusic }) => {
  const router = useRouter();

  const setSearchQuery = useActionWithPayload(setSearchQueryAC);

  const handleSearchChange = useCallback(
    (query: string) => {
      if (query) {
        setSearchQuery(query);
        router.push({
          pathname: router.pathname,
          query: { ...router.query, search: query },
        });
      } else {
        router.push(router.pathname);
      }
    },
    [router, setSearchQuery]
  );
  return (
    <div className={s.header}>
      {canGoBack ? (
        <button
          className={s.button}
          onClick={() => {
            router.push(`/`);
            setSearchQuery('');
          }}
        >
          <Image
            src={starUrlBack}
            alt={'Back'}
            className={s.color}
          />
        </button>
      ) : (
        <button
          className={s.button}
          onClick={() => setMenuIsOpen(prevValue => !prevValue)}
        >
          <Image
            src={starUrlAdd}
            alt={'Add'}
            className={s.color}
          />
        </button>
      )}
      {!pathMusic ? (
        <SearchInput
          onSearchChange={handleSearchChange}
          clearSearchInput={setSearchQuery}
          defaultValue={(router.query.search as string) || ''}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(Header);
