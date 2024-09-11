import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { v1 } from 'uuid';

import Input from '../Input/Input';
import AddImageInput from '../Input/AddImageInput/AddImageInput';
import Button from '../Buttons/Button/Button';
import Select from '../Select/Select';

import { FilterMusicValues, GenresItems, MusicItem } from '@/store/types';
import { useActionWithPayload } from '@/hooks/useAction';
import { addMusicAC, changeMusicInputsAC } from '@/store/actions';
import { genresItems } from '@/store/constants';

import s from './ModalWindow.module.sass';
import cx from 'classnames';

type ModalWindowItems = {
  menuIsOpen: boolean;
  infoIsOpen: boolean;
  editIsOpen: boolean;
  onCloseModalWindow: () => void;
  deleteMusicOnClick: (payload: { musicId: string }) => void;
  selectedMusicItem: {
    name: string;
    performer: string;
    genre: {
      disabled?: boolean;
      value: string;
      title: FilterMusicValues;
    };
    year: string | number;
  };
  selectedMusicId: string;
};

const ModalWindow: FC<ModalWindowItems> = ({
  menuIsOpen,
  infoIsOpen,
  editIsOpen,
  onCloseModalWindow,
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

  const checkInputsValue =
    inputName.length > 1 &&
    inputPerformer.length > 1 &&
    inputName.trim() !== '' &&
    inputPerformer.trim() !== '' &&
    !selectGenre.disabled;

  const changeMusic = useCallback(() => {
    if (checkInputsValue) {
      if (selectedMusicItem) {
        const updatedName =
          inputName !== '' ? inputName : selectedMusicItem.name;
        const updatedPerformer =
          inputPerformer !== '' ? inputPerformer : selectedMusicItem.performer;
        const updatedYear =
          inputYear !== '' ? inputYear : selectedMusicItem.year;
        changeMusicInputsAction({
          musicId: selectedMusicId,
          name: updatedName,
          performer: updatedPerformer,
          genre: selectGenre,
          year: updatedYear,
        });
      }
      onCloseModalWindow();
      setError(false);
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
    changeMusicInputsAction,
  ]);

  const addMusicHandler = useCallback(
    (music: MusicItem) => {
      if (checkInputsValue) {
        addMusicAction({ music });
        onCloseModalWindow();
        setError(false);
      } else {
        setError(true);
      }
    },
    [checkInputsValue, addMusicAction, onCloseModalWindow]
  );

  const saveClickHandler = useCallback(() => {
    const newMusic: MusicItem = {
      id: v1(),
      name: inputName,
      performer: inputPerformer,
      genre: selectGenre,
      year: inputYear,
    };
    menuIsOpen ? addMusicHandler(newMusic) : changeMusic();
  }, [
    menuIsOpen,
    inputName,
    inputPerformer,
    selectGenre,
    inputYear,
    addMusicHandler,
    changeMusic,
  ]);

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
      onClick={() => {
        onCloseModalWindow(), setError(false);
      }}
    >
      <div
        className={infoMusic}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={s.closed}
          title="Cancel"
          onClick={() => {
            onCloseModalWindow(), setError(false);
          }}
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
                  error={error}
                />
                <Input
                  error={error}
                  onChange={setInputPerformer}
                  getPlaceholder={'Performer *'}
                  required={true}
                  className={s['style-input']}
                  getType={'text'}
                  value={inputPerformer}
                  maxLength={13}
                />
                <Select
                  setSelectGenre={setSelectGenre}
                  selectGenre={selectGenre}
                />
                {error && selectGenre.disabled ? (
                  <span
                    className={cx(s['error-message'], s['error-message-genre'])}
                  >
                    You must select a genre
                  </span>
                ) : (
                  ''
                )}
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
                  deleteMusicOnClick({ musicId: selectedMusicId }),
                    onCloseModalWindow(),
                    setError(false);
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
