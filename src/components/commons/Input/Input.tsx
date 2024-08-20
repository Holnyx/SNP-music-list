import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import s from './Input.module.sass';
import cx from 'classnames';
import { useActionWithPayload } from '@/hooks/hooks';
import { MusicItems } from '@/store/types';
import { addMusicAC } from '@/store/actions';

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
}) => {
  let [valueInputs, setValueInputs] = useState(value);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInputs(e.currentTarget.value);
  };

  return (
    <input
      onChange={changeTitle}
      placeholder={getPlaceholder}
      required={required}
      className={s.style}
      type={getType}
      maxLength={maxLength}
      pattern={pattern}
      max={max}
      accept={accept}
      value={valueInputs}
    ></input>
  );
};

export default memo(Input);
