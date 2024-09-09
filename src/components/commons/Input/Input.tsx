import React, { ChangeEvent, Dispatch, FC, memo, SetStateAction } from 'react';

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
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
  error: boolean;
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
  error,
}) => {
  const onValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <>
      <input
        onChange={onValueChanged}
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
      {(value && value.length < 2) ||
      (value === '' && error && getPlaceholder === 'Name *') ? (
        <span className={cx(s['error-message'], s['error-message-name'])}>
          The name must contain more than one character
        </span>
      ) : (value && value.length < 2) ||
        (value === '' && error && getPlaceholder === 'Performer *') ? (
        <span className={cx(s['error-message'], s['error-message-performer'])}>
          The performer must contain more than one character
        </span>
      ) : !error ? (
        ''
      ) : (
        ''
      )}
    </>
  );
};

export default memo(Input);
