import React, { FC, memo } from 'react';

import s from './Input.module.sass';
import cx from 'classnames';

type InputItems = {
  getType: string;
  getPlaceholder: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
  pattern?: string;
  max?: string;
  accept?: string
};

const Input: FC<InputItems> = ({
  getType,
  getPlaceholder,
  required,
  maxLength,
  pattern,
  max,
  accept
}) => {
  return (
    <input
      placeholder={getPlaceholder}
      required={required}
      className={s.style}
      type={getType}
      maxLength={maxLength}
      pattern={pattern}
      max={max}
      accept={accept}
    ></input>
  );
};

export default memo(Input);
