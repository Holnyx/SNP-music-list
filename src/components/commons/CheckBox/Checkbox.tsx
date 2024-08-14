import React, { FC, memo } from 'react';

import s from './Checkbox.module.sass';
import cx from 'classnames';

type CheckBoxItem = {
  label?: string;
  link?: string;
};

const CheckBox: FC<CheckBoxItem> = ({ label }) => {
  return (
    <div className={s.new_checkbox}>
      <input
        className={s.checkbox}
        type="checkbox"
        id="confirm"
        required
      ></input>
      <label
        className={s.custom_checkbox}
        htmlFor="confirm"
      >
        <svg
          className={s.custom_checkbox_img}
          id="custom_checkbox_img"
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 2L9.66774 16.4101C9.47218 16.7121 9.0467 16.754 8.79602 16.4959L2 9.5"
            stroke="#FF9900"
            stroke-width="2.24"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </label>
      <label
        className={s.checkbox__label}
        htmlFor="confirm"
      >
        {label}
      </label>
    </div>
  );
};
export default memo(CheckBox);
