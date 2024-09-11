import React, { memo, useCallback } from 'react';

import { useActionWithPayload } from '@/hooks/useAction';
import { changeMusicsFilterAC } from '@/store/actions';
import { FilterMusicValues } from '@/store/types';
import { useSelector } from 'react-redux';
import { musicFilterSelector } from '@/store/selectors';
import { genresItemsButtons } from '@/components/state/genresItemsButtons';

import s from './FilterGenres.module.sass';
import cx from 'classnames';

const FilterGenres = () => {
  const filter = useSelector(musicFilterSelector);

  const changeMusicsFilterAction = useActionWithPayload(changeMusicsFilterAC);

  const changeMusicsFilter = useCallback((filter: FilterMusicValues) => {
    changeMusicsFilterAction(filter);
  }, []);

  return (
    <div className={s['container']}>
      <h3 className={s['title']}>Genres</h3>
      <div className={s['buttons']}>
        {genresItemsButtons.map((item, i) => (
          <button
            key={i}
            className={cx(s['button'], {
              [s['btn-focus']]: filter === item.title,
            })}
            onClick={() => changeMusicsFilter(item.title)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(FilterGenres);
