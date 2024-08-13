import React from 'react';

import s from './ModalWindow.module.sass';
import cx from 'classnames';
import Input from '../Input/Input';
import CheckBox from '../CheckBox/Checkbox';

const ModalWindow = () => {
  return (
    <div className={s.container}>
      <div className={s.window}>
        <button className={s.closed} title='Cancel'>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.74367 7.21198L19.573 19.8808L20.2458 19.1994L7.41646 6.53066L6.74367 7.21198ZM6.5418 19.784L7.24883 20.4822L20.7046 6.85577L19.9976 6.15759L6.5418 19.784Z"
              fill="#FF9900"
            />
          </svg>
        </button>
        <h2 className={s.title}>Add new music</h2>
        <form className={s.form}>
          <fieldset className={s.add_images_box}>
            <label
              htmlFor="image-uploads"
              className={s.add_image}
              title='Click for add cover for your track'
            >
              +
            </label>
            <input
              type={'file'}
              className={s.uploads}
              accept={'.jpg, .jpeg, .png'}
              id={'image-uploads'}
            />
            <CheckBox label="Without cover" />
          </fieldset>
          <fieldset className={s.fieldset}>
            <Input
              getType={'text'}
              getPlaceholder={'Name'}
            />
            <Input
              getType={'text'}
              getPlaceholder={'Performer'}
            />
            <select
              name="genre"
              id="genre"
              className={s.genre}
            >
              <option value="Blues">Blues</option>
            </select>
            <Input
              getType={'number'}
              getPlaceholder={'Year'}
              max="2024"
              required={true}
            />
          </fieldset>
        </form>
        <div className={s.buttons_box}>
          <button className={s.delete}>Delete</button>
          <button className={s.save}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
