import React, {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Input from '../Input/Input';
import AddImageInput from '../Input/AddImageInput/AddImageInput';
import Button from '../Buttons/Button/Button';

import s from './ModalWindow.module.sass';
import cx from 'classnames';
import { genresItems, GenresItems, MusicItems } from '@/store/types';
import Select from '../Select/Select';
import { useActionWithPayload } from '@/hooks/hooks';
import { addMusicAC } from '@/store/actions';
import { useSelector } from 'react-redux';
import { musicSelector } from '@/store/selectors';

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
  name: string;
  performer: string;
  genre: GenresItems;
  year: number;
  selectedMusicId: string;
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
  name,
  performer,
  genre,
  year,
  selectedMusicId,
}) => {
  const [inputName, setInputName] = useState(name);
  const [inputPerformer, setInputPerformer] = useState(performer);
  const [selectGenre, setSelectGenre] = useState(genresItems[0]);
  const [inputYear, setInputYear] = useState(year);

  const closeModalWindow = () => {
    setMenuIsOpen(false);
    setInfoIsOpen(false);
    setEditIsOpen(false);
  };
  const allMusics = useSelector(musicSelector);

  const addMusicAction = useActionWithPayload(addMusicAC);

  const newMusic: MusicItems = {
    id: id,
    name: inputName,
    performer: inputPerformer,
    genre: selectGenre,
    year: inputYear,
  };

  const addTaskHandler = useCallback((music: MusicItems) => {
    addMusicAction({ music: music });
    closeModalWindow();
  }, []);

  const showModalWindow = cx(s.container, {
    [s.active]: menuIsOpen || infoIsOpen || editIsOpen,
  });

  const addMusic = cx(s.buttons_box, { [s.add_music]: menuIsOpen });
  const infoMusic = cx(s.window, { [s.info]: infoIsOpen });

  const changeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.currentTarget.value;
    const selectedGenre = genresItems.find(
      genre => genre.value === selectedValue
    );
    if (selectedGenre) {
      setSelectGenre(selectedGenre);
    }
  };

  const changeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value, 10);
    if (!isNaN(newValue)) {
      setInputYear(newValue);
    }
  };

  const selectedMusic = allMusics.find(music => music.id === selectedMusicId);

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
            {infoIsOpen && selectedMusicId && selectedMusic ? (
              <>
                <span className={s.label}>Name</span>
                <h6>{inputName}</h6>
                <span className={s.label}>Performer</span>
                <h6>{inputPerformer}</h6>
                <span className={s.label}>Genre</span>
                <h6>{selectGenre.title}</h6>
                <span className={s.label}>Year</span>
                <h6>{inputYear}</h6>
              </>
            ) : (
              <>
                <Input
                  onChange={setInputName}
                  getPlaceholder={'Name'}
                  required
                  className={s['style-input']}
                  getType={'text'}
                  value={inputName}
                />
                <Input
                  onChange={setInputPerformer}
                  getPlaceholder={'Performer'}
                  required
                  className={s['style-input']}
                  getType={'text'}
                  value={inputPerformer}
                />
                <Select
                  value={editIsOpen ? selectGenre.title : ''}
                  changeGenre={changeGenre}
                />
                <input
                  onChange={changeYear}
                  placeholder={'Year'}
                  required
                  className={s['style-input']}
                  type={'number'}
                  value={inputYear}
                ></input>
              </>
            )}
          </fieldset>
        </form>
        {!infoIsOpen ? (
          <div className={addMusic}>
            {!menuIsOpen ? (
              <Button
                onClickHandler={() => {
                  deleteMusicOnClick(selectedMusicId === id ? id : selectedMusicId);
                }}
                title="Delete"
              />
            ) : (
              ''
            )}
            <Button
              onClickHandler={() =>
                menuIsOpen ? addTaskHandler(newMusic) : ''
              }
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
