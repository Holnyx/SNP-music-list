import React, { FC } from 'react';

import s from './Button.module.sass';
import cx from 'classnames';

type ButtonItems = {
  title: string;
  onClickHandler: () => void;
};

const Button: FC<ButtonItems> = ({ title, onClickHandler }) => {
  const changeStyleButton = cx({
    [s.delete]: true,
    [s.save]: title == 'Save',
  });

  return (
    <button
      className={changeStyleButton}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
};

export default Button;
