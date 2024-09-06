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

import { v1 } from 'uuid';

import Input from '../Input/Input';
import AddImageInput from '../Input/AddImageInput/AddImageInput';
import Button from '../Buttons/Button/Button';
import Select from '../Select/Select';

import { GenresItems, MusicItem } from '@/store/types';
import { useActionWithPayload } from '@/hooks/useAction';
import { addMusicAC, changeMusicInputsAC } from '@/store/actions';
import { useSelector } from 'react-redux';
import { selectedMusicSelector } from '@/store/selectors';

import s from './ModalWindow.module.sass';
import cx from 'classnames';
import { genresItems } from '@/store/constants';

type ModalWindowItems = {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  infoIsOpen: boolean;
  setInfoIsOpen: Dispatch<SetStateAction<boolean>>;
  editIsOpen: boolean;
  setEditIsOpen: Dispatch<SetStateAction<boolean>>;
  deleteMusicOnClick: (id: string) => void;
  selectedMusicItem: {
    name: string;
    performer: string;
    genre: {
      disabled?: boolean;
      value: string;
      title: string;
    };
    year: string | number;
  };
  selectedMusicId: string;
};

const ModalWindow: FC<ModalWindowItems> = ({
  menuIsOpen,
  setMenuIsOpen,
  infoIsOpen,
  setInfoIsOpen,
  editIsOpen,
  setEditIsOpen,
  deleteMusicOnClick,
  selectedMusicItem,
  selectedMusicId,
}) => {
  const [inputName, setInputName] = useState(selectedMusicItem.name);
  const [inputPerformer, setInputPerformer] = useState(
    selectedMusicItem.performer
  );
  const [selectGenre, setSelectGenre] = useState(
    selectedMusicItem.genre || genresItems[0]
  );
  const [inputYear, setInputYear] = useState(selectedMusicItem.year);
  const [error, setError] = useState(false);

  const addMusicAction = useActionWithPayload(addMusicAC);
  const changeMusicInputsAction = useActionWithPayload(changeMusicInputsAC);

  const newMusic: MusicItem = {
    id: v1(),
    name: inputName,
    performer: inputPerformer,
    genre: selectGenre,
    year: inputYear,
  };

  const addMusicHandler = useCallback(
    (music: MusicItem) => {
      if (checkInputsValue) {
        addMusicAction({ music });
        closeModalWindow();
      } else {
        setError(true);
      }
    },
    [inputName, inputPerformer, selectGenre, inputYear, addMusicAction]
  );

  const changeMusicInputs = useCallback(
    (
      musicId: string,
      name: string,
      performer: string,
      genre: GenresItems,
      year: string | number
    ) => {
      changeMusicInputsAction({ musicId, name, performer, genre, year });
    },
    [changeMusicInputsAction]
  );

  const changeMusicInputsHandler = useCallback(() => {
    if (checkInputsValue) {
      if (selectedMusicItem) {
        const updatedName =
          inputName !== '' ? inputName : selectedMusicItem.name;
        const updatedPerformer =
          inputPerformer !== '' ? inputPerformer : selectedMusicItem.performer;
        const updatedYear =
          inputYear !== '' ? inputYear : selectedMusicItem.year;
        changeMusicInputs(
          selectedMusicId,
          updatedName,
          updatedPerformer,
          selectGenre,
          updatedYear
        );
      }
      closeModalWindow();
    } else {
      setError(true);
    }
  }, [
    selectedMusicId,
    inputName,
    inputPerformer,
    selectGenre,
    inputYear,
    selectedMusicItem,
    changeMusicInputs,
  ]);

  const saveClickHandler = useCallback(() => {
    menuIsOpen ? addMusicHandler(newMusic) : changeMusicInputsHandler();
  }, [addMusicHandler, newMusic]);

  const closeModalWindow = useCallback(() => {
    setMenuIsOpen(false);
    setInfoIsOpen(false);
    setEditIsOpen(false);
    setError(false);
  }, []);

  const changeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value);
    if (!isNaN(newValue) && newValue <= 2024) {
      setInputYear(newValue);
    }
  };

  //Change input values ​​when adding and editing
  useEffect(() => {
    if (editIsOpen && selectedMusicItem) {
      setInputName(selectedMusicItem.name);
      setInputPerformer(selectedMusicItem.performer);
      setSelectGenre(selectedMusicItem.genre);
      setInputYear(selectedMusicItem.year);
    } else if (menuIsOpen) {
      setInputName('');
      setInputPerformer('');
      setSelectGenre(genresItems[0]);
      setInputYear('');
    }
  }, [editIsOpen, menuIsOpen, selectedMusicItem]);

  const checkInputsValue =
    inputName.length > 1 &&
    inputPerformer.length > 1 &&
    inputName.trim() !== '' &&
    inputPerformer.trim() !== '' &&
    !selectGenre.disabled;

  const errorName =
    error && inputName.length <= 1 ? (
      <span className={cx(s['error-message'], s['error-message-name'])}>
        The name must contain more than one character
      </span>
    ) : (
      ''
    );

  const errorPerformer =
    error && inputPerformer.length <= 1 ? (
      <span className={cx(s['error-message'], s['error-message-performer'])}>
        The performer must contain more than one character
      </span>
    ) : (
      ''
    );

  const errorGenre =
    error && selectGenre.disabled ? (
      <span className={cx(s['error-message'], s['error-message-genre'])}>
        You must select a genre
      </span>
    ) : (
      ''
    );

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
              className={s['closed-img']}
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
            {infoIsOpen && selectedMusicId && selectedMusicItem ? (
              <>
                <span className={s.label}>Name</span>
                <h6 className={s.names}>{selectedMusicItem.name}</h6>
                <span className={s.label}>Performer</span>
                <h6 className={s.names}>{selectedMusicItem.performer}</h6>
                <span className={s.label}>Genre</span>
                <h6 className={s.names}>{selectedMusicItem.genre.title}</h6>

                {selectedMusicItem.year && (
                  <>
                    <span className={s.label}>Year</span>
                    <h6 className={s.names}>{selectedMusicItem.year}</h6>
                  </>
                )}
              </>
            ) : (
              <>
                <Input
                  onChange={setInputName}
                  getPlaceholder={'Name *'}
                  required={true}
                  className={s['style-input']}
                  getType={'text'}
                  value={inputName}
                  maxLength={13}
                />
                {errorName}
                <Input
                  onChange={setInputPerformer}
                  getPlaceholder={'Performer *'}
                  required={true}
                  className={s['style-input']}
                  getType={'text'}
                  value={inputPerformer}
                  maxLength={13}
                />
                {errorPerformer}
                <Select
                  setSelectGenre={setSelectGenre}
                  selectGenre={selectGenre}
                />
                {errorGenre}
                <input
                  min="1000"
                  max="2024"
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
                  deleteMusicOnClick(selectedMusicId), closeModalWindow();
                }}
                title="Delete"
              />
            ) : (
              ''
            )}
            <Button
              onClickHandler={saveClickHandler}
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
