import React, { memo, useCallback, useEffect, useId, useState } from 'react';

import { v1 } from 'uuid';

import Header from '@/components/commons/Header/Header';
import FilterGenres from '@/components/commons/FilterGenres/FilterGenres';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';
import MusicItem from '@/components/commons/MusicItem/MusicItem';
import { useActionWithPayload } from '@/hooks/hooks';
import { InitMusicsFromStorageAC, removeMusicAC } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  musicListSelector,
  musicSelector,
  selectMusic,
} from '@/store/selectors';

import s from './HomePage.module.sass';
import cx from 'classnames';

const HomePage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState({
    name: '',
    performer: '',
    genre: { value: '1', title: 'Choose genre *' },
    year: +Number() || '',
  });

  const dispatch = useDispatch();
  const id = v1();
  const allMusics = useSelector(musicSelector);
  const filteredMusics = useSelector(musicListSelector);
  const selectedMusicSelector = useSelector(state =>
    selectMusic(state, selectedMusicId)
  );

  const removeMusicAction = useActionWithPayload(removeMusicAC);

  const removeMusic = useCallback((musicId: string) => {
    removeMusicAction({ musicId });
  }, []);

  const openInfoModal = useCallback(
    (id: string) => {
      if (selectedMusicSelector) {
        setSelectedMusic({
          name: selectedMusicSelector.name,
          performer: selectedMusicSelector.performer,
          genre: selectedMusicSelector.genre,
          year: selectedMusicSelector.year,
        });
      }
      setInfoIsOpen(true);
      setSelectedMusicId(id);
    },
    [selectedMusicSelector, setInfoIsOpen]
  );

  const openEditModal = useCallback(
    (id: string) => {
      selectedMusicSelector &&
        setSelectedMusic({
          name: selectedMusicSelector.name,
          performer: selectedMusicSelector.performer,
          genre: selectedMusicSelector.genre,
          year: selectedMusicSelector.year,
        });
      setEditIsOpen(true);
      setSelectedMusicId(id);
    },
    [selectedMusicSelector, setEditIsOpen]
  );

  useEffect(() => {
    const storedMusics = localStorage.getItem('musics');
    if (storedMusics) {
      const parsedMusics = JSON.parse(storedMusics);
      dispatch(InitMusicsFromStorageAC(parsedMusics));
    }
  }, [dispatch]);

  useEffect(() => {
    if (allMusics && allMusics.length > 0) {
      localStorage.setItem('musics', JSON.stringify(allMusics));
    } else {
      localStorage.removeItem('musics');
    }
  }, [allMusics]);

  return (
    <div className={s.container}>
      <Header
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
      <FilterGenres />
      <div className={s.container_music}>
        {filteredMusics.map((element, i) => {
          return (
            <MusicItem
              key={i}
              id={element.id}
              checked={checked}
              name={element.name}
              performer={element.performer}
              infoIsOpen={infoIsOpen}
              setInfoIsOpen={setInfoIsOpen}
              editIsOpen={editIsOpen}
              setEditIsOpen={setEditIsOpen}
              removeMusic={removeMusic}
              onClickInfo={openInfoModal}
              onClickEdit={openEditModal}
            />
          );
        })}
      </div>
      <ModalWindow
        id={id}
        checked={checked}
        setChecked={setChecked}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        infoIsOpen={infoIsOpen}
        setInfoIsOpen={setInfoIsOpen}
        editIsOpen={editIsOpen}
        setEditIsOpen={setEditIsOpen}
        deleteMusicOnClick={removeMusic}
        name={selectedMusic.name}
        performer={selectedMusic.performer}
        genre={selectedMusic.genre}
        year={selectedMusic.year}
        selectedMusicId={selectedMusicId}
      />
    </div>
  );
};

export default memo(HomePage);
