import React, { Dispatch, FC, memo, SetStateAction, useCallback, useState } from 'react';

import Input from '../Input/Input';
import AddImageInput from '../Input/AddImageInput/AddImageInput';
import Button from '../Buttons/Button/Button';

import s from './ModalWindow.module.sass';
import cx from 'classnames';
import { GenresItems, MusicItems } from '@/store/types';
import Select from '../Select/Select';
import { useActionWithPayload } from '@/hooks/hooks';
import { addMusicAC } from '@/store/actions';

type ModalWindowItems = {
  id: string;
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  infoIsOpen: boolean;
  setInfoIsOpen: Dispatch<SetStateAction<boolean>>;
  editIsOpen: boolean;
  setEditIsOpen: Dispatch<SetStateAction<boolean>>;
  deleteMusicOnClick: (id: string) => void;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

const ModalWindow: FC<ModalWindowItems> = ({
  id,
  menuIsOpen,
  setMenuIsOpen,
  infoIsOpen,
  setInfoIsOpen,
  editIsOpen,
  setEditIsOpen,
  deleteMusicOnClick,
  checked,
  setChecked,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<GenresItems>({
    value: '15',
    title: 'All',
  });
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    performer: '',
    genre: selectedGenre,
    year: 0,
  });

  const closeModalWindow = () => {
    setMenuIsOpen(false);
    setInfoIsOpen(false);
    setEditIsOpen(false);
  };

  const [taskTitle, setTaskTitle] = useState('');

  const addTaskAction = useActionWithPayload(addMusicAC);

  const addTask = useCallback((music: MusicItems) => {
    addTaskAction({ music });
  }, []);

  const addTaskHandler = useCallback(() => {
    if (taskTitle.trim() !== '') {
      addTask({
        id: '',
        name: taskTitle,
        performer: '',
        genre: selectedGenre,
        year: 0,
      });
    }
    setTaskTitle('');
  }, [taskTitle, addTask]);


  // const addMusic = (music: MusicItems) => {
  //   setList([...list, music]);
  //   setMenuIsOpen(false)
  // };

  const showModalWindow = cx(s.container, {
    [s.active]: menuIsOpen || infoIsOpen || editIsOpen,
  });

  const addMusic = cx(s.buttons_box, { [s.add_music]: menuIsOpen });
  const infoMusic = cx(s.window, { [s.info]: infoIsOpen });

  return (
    <div
      className={showModalWindow}
      onClick={closeModalWindow}
    >
      <div
        className={infoMusic}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={s.closed}
          title="Cancel"
          onClick={closeModalWindow}
        >
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
        <h2 className={s.title}>
          {infoIsOpen ? 'Info Music' : 'Add new music'}
        </h2>
        <form className={s.form}>
          <fieldset className={s.add_images_box}>
            <AddImageInput />
          </fieldset>
          <fieldset className={s.fieldset}>
            {infoIsOpen ? (
              <>
                <span className={s.label}>Name</span>
                <h6>{formData.name}</h6>
                <span className={s.label}>Performer</span>
                <h6>{formData.performer}</h6>
                <span className={s.label}>Genre</span>
                <h6>{String(formData.genre)}</h6>
                <span className={s.label}>Year</span>
                <h6>{formData.year}</h6>
              </>
            ) : (
              <>
                <Input
                  getType={'text'}
                  getPlaceholder={'Name'}
                  required={true}
                  value={editIsOpen ? formData.name : ''}
                />
                <Input
                  getType={'text'}
                  getPlaceholder={'Performer'}
                  required={true}
                  value={editIsOpen ? formData.performer : ''}
                />
                <Select value={editIsOpen ? String(formData.genre) : ''} />
                <Input
                  getType={'number'}
                  getPlaceholder={'Year'}
                  max="2024"
                  value={editIsOpen ? formData.year : ''}
                />
              </>
            )}
          </fieldset>
        </form>
        {!infoIsOpen ? (
          <div className={addMusic}>
            {!menuIsOpen ? (
              <Button
                onClickHandler={() => {
                  deleteMusicOnClick(id);
                }}
                title="Delete"
              />
            ) : (
              ''
            )}
            <Button
              onClickHandler={() => menuIsOpen && addTaskHandler()}
              title="Save"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default memo(ModalWindow);
