import React, { memo } from 'react';
import genresItems from '@/components/state/genresItems';

import s from './FilterGenres.module.sass';
import cx from 'classnames';


const FilterGenres = () => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Genres</h3>
      <div className={s.buttons}>
        {genresItems.map((item, i) => (
          <button key={i} className={s.button}>{item.title}</button>
        ))}
      </div>
    </div>
  );
};

export default memo(FilterGenres);
