import React, { memo, useCallback, useEffect, useId, useState } from 'react';

import { useSelector } from 'react-redux';
import { getCookie, setCookie } from 'cookies-next';

import Header from '@/components/commons/Header/Header';
import FilterGenres from '@/components/commons/FilterGenres/FilterGenres';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';
import MusicItemBox from '@/components/commons/MusicItemBox/MusicItemBox';
import { useActionWithPayload } from '@/hooks/useAction';
import { initMusicsFromStorageAC, removeMusicAC } from '@/store/actions';
import { FilterMusicValues, SelectedMusicItem } from '@/store/types';
import {
  combinedFilteredMusicsSelector,
  musicSelector,
  selectedMusicSelector,
} from '@/store/selectors';

import s from './HomePage.module.sass';
import cx from 'classnames';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import router from 'next/router';

const HomePage = ({
  search,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(search = '');
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState<string>('');
  const [selectedMusicItem, setSelectedMusicItem] = useState<SelectedMusicItem>(
    {
      name: '',
      performer: '',
      genre: { value: '1', title: 'Other' as FilterMusicValues },
      year: +Number() || '',
    }
  );

  const filteredMusics = useSelector(combinedFilteredMusicsSelector);
  const allMusics = useSelector(musicSelector);
  const selectedMusic = useSelector(state =>
    selectedMusicSelector(state, selectedMusicId)
  );

  const removeMusicAction = useActionWithPayload(removeMusicAC);
  const InitMusicsFromStorageAction = useActionWithPayload(
    initMusicsFromStorageAC
  );

  const openInfoModal = useCallback(
    (id: string) => {
      if (selectedMusic) {
        setSelectedMusicItem({
          name: selectedMusic.name,
          performer: selectedMusic.performer,
          genre: selectedMusic.genre,
          year: selectedMusic.year,
        });
      }
      setInfoIsOpen(true);
      setSelectedMusicId(id);
    },
    [selectedMusicSelector, setInfoIsOpen]
  );

  const openEditModal = useCallback(
    (id: string) => {
      selectedMusic &&
        setSelectedMusicItem({
          name: selectedMusic.name,
          performer: selectedMusic.performer,
          genre: selectedMusic.genre,
          year: selectedMusic.year,
        });
      setEditIsOpen(true);
      setSelectedMusicId(id);
    },
    [selectedMusicSelector, setEditIsOpen]
  );

  const onCloseModalWindow = useCallback(() => {
    setMenuIsOpen(false);
    setInfoIsOpen(false);
    setEditIsOpen(false);
  }, []);

  // Update input values
  useEffect(() => {
    if (selectedMusic) {
      setSelectedMusicItem({
        name: selectedMusic.name,
        performer: selectedMusic.performer,
        genre: selectedMusic.genre,
        year: selectedMusic.year,
      });
    }
  }, [selectedMusic, selectedMusicId]);

  useEffect(() => {
    const storedMusics = getCookie('musics');
    if (storedMusics) {
      const parsedMusics = JSON.parse(storedMusics);
      InitMusicsFromStorageAction(parsedMusics);
    }
  }, [InitMusicsFromStorageAction]);

  useEffect(() => {
    if (allMusics && allMusics.length > 0) {
      setCookie('musics', JSON.stringify(allMusics), {
        path: '/',
        sameSite: 'lax',
      });
    } else {
      setCookie('musics', '');
    }
  }, [allMusics]);

  return (
    <div className={s.container}>
      <Header setMenuIsOpen={setMenuIsOpen} />
      <FilterGenres />
      <div className={s.container_music}>
        {filteredMusics.map((element, i) => {
          return (
            <MusicItemBox
              key={element.id}
              id={element.id}
              name={element.name}
              performer={element.performer}
              removeMusic={removeMusicAction}
              onClickInfo={openInfoModal}
              onClickEdit={openEditModal}
            />
          );
        })}
      </div>
      <ModalWindow
        onCloseModalWindow={onCloseModalWindow}
        menuIsOpen={menuIsOpen}
        infoIsOpen={infoIsOpen}
        editIsOpen={editIsOpen}
        deleteMusicOnClick={removeMusicAction}
        selectedMusicItem={selectedMusicItem}
        selectedMusicId={selectedMusicId}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const search = (context.query.search = '');
  return {
    props: {
      search: search,
    },
  };
};

export default memo(HomePage);
