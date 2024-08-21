import React, { ChangeEvent, FC, memo, useState } from 'react';

import s from './Select.module.sass';
import cx from 'classnames';
import { genresItems } from '@/store/types';

type SelectItems = {
  value: string;
  changeGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: FC<SelectItems> = ({ value, changeGenre }) => {
  const [select, setSelect] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.currentTarget.value);
  };

  const isPlaceholder = genresItems.some(
    element => element.value === select && element.disabled
  );

  const selectPlaceholder = cx({
    [s['genre']]: true,
    [s['color']]: isPlaceholder,
  });

  return (
    <>
      <select
        name="genre"
        id="genre"
        className={selectPlaceholder}
        onChange={changeGenre}
      >
        {genresItems.map((element, i) => (
          <option
            key={i}
            value={element.value}
          >
            {element.title}
          </option>
        ))}
      </select>
      <svg
        className={s.icon}
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 19.4141L4.29289 10.707C3.90236 10.3164 3.90237 9.68326 4.29289 9.29274C4.68341 8.90221 5.31658 8.90221 5.7071 9.29274L13 16.5856L20.2929 9.29274C20.6834 8.90221 21.3166 8.90221 21.7071 9.29274C22.0976 9.68326 22.0976 10.3164 21.7071 10.707L13 19.4141Z"
          fill="#f90"
        />
      </svg>
    </>
  );
};

export default memo(Select);
