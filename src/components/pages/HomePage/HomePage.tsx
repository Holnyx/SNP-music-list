import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';

import Header from '@/components/commons/Header/Header';
import SearchInput from '@/components/commons/SearchInput/SearchInput';
import FilterGenres from '@/components/commons/FilterGenres/FilterGenres';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';

import { GenresItems } from '@/components/state/genresItems';

import s from './HomePage.module.sass';
import cx from 'classnames';
import MusicItem from '@/components/commons/MusicItem/MusicItem';
import { MusicItems } from '@/store/types';
import { useActionWithPayload } from '@/hooks/hooks';
import { addMusicAC, InitTodosFromStorageAC, removeMusicAC } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { musicListSelector, musicSelector } from '@/store/selectors';

const HomePage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const id = useId();
  const dispatch = useDispatch();
  const allMusics = useSelector(musicSelector);
  // const [list, setList] = useState<MusicItems[]>([
  //   {
  //     id,
  //     name: 'Woh pehli dafa',
  //     performer: 'DZ Messiliazazaz',
  //     genre: {
  //       value: '1',
  //       title: 'Blues',
  //     },

  //     year: 2024,
  //   },
  //   {
  //     id,
  //     name: 'Woh pehli dafa',
  //     performer: 'DZ Messiliazazaz',
  //     genre: {
  //       value: '1',
  //       title: 'Blues',
  //     },

  //     year: 2024,
  //   },
  // ]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('musics');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      dispatch(InitTodosFromStorageAC(parsedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    if (allMusics && allMusics.length > 0) {
      localStorage.setItem('musics', JSON.stringify(allMusics));
    } else {
      localStorage.removeItem('musics');
    }
  }, [allMusics]);

  const filteredMusics = useSelector(musicListSelector);

  const removeTaskAction = useActionWithPayload(removeMusicAC);
  const removeTask = useCallback((id: string) => {
    removeTaskAction({ musicId: id });
  }, []);

  // const addMusic = (music: MusicItems) => {
  //   setList([...list, music]);
  //   setMenuIsOpen(false)
  // };

  // const deleteMusic = (id: string) => {
  //   setList(list.filter(element => element.id !== id));
  //   setEditIsOpen(false)
  // };

  return (
    <div className={s.container}>
      <Header
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
      <SearchInput />
      <FilterGenres />
      <div className={s.container_music}>
        {filteredMusics.map((element, i) => {
          return (
            <MusicItem
              checked={checked}
              key={i}
              id={element.id}
              name={element.name}
              performer={element.performer}
              infoIsOpen={infoIsOpen}
              setInfoIsOpen={setInfoIsOpen}
              editIsOpen={editIsOpen}
              setEditIsOpen={setEditIsOpen}
            />
          );
        })}
      </div>
      <ModalWindow
        id={'1'}
        checked={checked}
        setChecked={setChecked}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        infoIsOpen={infoIsOpen}
        setInfoIsOpen={setInfoIsOpen}
        editIsOpen={editIsOpen}
        setEditIsOpen={setEditIsOpen}
        deleteMusicOnClick={removeTask}
      />
    </div>
  );
};

export default memo(HomePage);
