import React, { memo, useCallback, useEffect, useId, useState } from 'react';

import Header from '@/components/commons/Header/Header';
import FilterGenres from '@/components/commons/FilterGenres/FilterGenres';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';

import s from './HomePage.module.sass';
import cx from 'classnames';
import MusicItem from '@/components/commons/MusicItem/MusicItem';
import { MusicItems } from '@/store/types';
import { useActionWithPayload } from '@/hooks/hooks';
import { InitMusicsFromStorageAC, removeMusicAC } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { musicListSelector, musicSelector } from '@/store/selectors';
import { v1 } from 'uuid';

const HomePage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const id = v1();
  const dispatch = useDispatch();
  const allMusics = useSelector(musicSelector);
  const filteredMusics = useSelector(musicListSelector);

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
    }
  }, [allMusics]);

  const removeMusicAction = useActionWithPayload(removeMusicAC);
  const removeMusic = useCallback((id: string) => {
    removeMusicAction({ musicId: id });
  }, []);

  const [selectedMusicId, setSelectedMusicId] = useState<string>('');
  const openInfoModal = (id: string) => {
    setSelectedMusicId(id);
  };


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
              checked={checked}
              key={i}
              id={element.id}
              name={element.name}
              performer={element.performer}
              genre={element.genre}
              year={element.year}
              infoIsOpen={infoIsOpen}
              setInfoIsOpen={setInfoIsOpen}
              editIsOpen={editIsOpen}
              setEditIsOpen={setEditIsOpen}
              onClickInfo={() => openInfoModal(element.id)}
              // onEditClick={() => openEditMusicModal(element)}
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
        name={''}
        performer={''}
        genre={{ value: '', title: '' }}
        year={Number()}
        selectedMusicId={selectedMusicId}
      />
    </div>
  );
};

export default memo(HomePage);
