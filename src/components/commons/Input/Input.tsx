import React, {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

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
  accept?: string;
  value?: string | number;
  onChange:  Dispatch<SetStateAction<string>>;
};

const Input: FC<InputItems> = ({
  getType,
  getPlaceholder,
  required,
  maxLength,
  pattern,
  max,
  accept,
  value,
  onChange,
}) => {

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      onChange={changeName}
      placeholder={getPlaceholder}
      required={required}
      className={s['style-input']}
      type={getType}
      maxLength={maxLength}
      pattern={pattern}
      max={max}
      accept={accept}
      value={value}
    ></input>
  );
};

export default memo(Input);
