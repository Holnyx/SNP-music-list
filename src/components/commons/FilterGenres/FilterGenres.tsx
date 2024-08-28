import React, { memo, useCallback } from 'react';

import { genresItems } from '@/components/state/genresItems';

import s from './FilterGenres.module.sass';
import cx from 'classnames';
import { useActionWithPayload } from '@/hooks/hooks';
import { changeMusicsFilterAC } from '@/store/actions';
import { FilterMusicValues } from '@/store/types';
import { useSelector } from 'react-redux';
import { musicFilterSelector } from '@/store/selectors';

const FilterGenres = () => {
  const filter = useSelector(musicFilterSelector);
  const changeMusicsFilterAction = useActionWithPayload(
    changeMusicsFilterAC
  );

  const changeMusicsFilter = useCallback((filter: FilterMusicValues) => {
    changeMusicsFilterAction(filter);
  }, []);
  return (
    <div className={s.container}>
      <h3 className={s.title}>Genres</h3>
      <div className={s.buttons}>
        {genresItems.map((item, i) => (
          <button
            key={i}
            className={cx(s['button'], {
              [s['btn-focus']]: filter === item.title,
            })}
            onClick={() =>
              changeMusicsFilter(item.title as FilterMusicValues)
            }
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(FilterGenres);
