import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';

import HeadComponent from '@/components/commons/HeadComponent/HeadComponent';
import Header from '@/components/commons/Header/Header';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';
import MusicItemBox from '@/components/commons/MusicItemBox/MusicItemBox';

import { useActionWithPayload } from '@/hooks/useAction';
import { initMusicsFromStorageAC, removeMusicAC } from '@/store/actions';
import { musicSelector, selectedMusicSelector } from '@/store/selectors';

import s from './MusicPage.module.sass';

type MusicPageItems = {
  id: string;
};

const MusicPage: FC<MusicPageItems> = ({ id }) => {
  const [editIsOpen, setEditIsOpen] = useState(false);

  const router = useRouter();
  const allMusics = useSelector(musicSelector);
  const selectedMusic = useSelector(state => selectedMusicSelector(state, id));

  const InitMusicsFromStorageAction = useActionWithPayload(
    initMusicsFromStorageAC
  );
  const removeMusicAction = useActionWithPayload(removeMusicAC);

  const openEditModal = useCallback(() => {
    if (selectedMusic) {
      setEditIsOpen(true);
    }
  }, [selectedMusic]);

  const closeEditModal = useCallback(() => {
    setEditIsOpen(false);
  }, []);

  useEffect(() => {
    if (allMusics.length > 0 && !selectedMusic) {
      router.replace('/404');
    }
  }, [selectedMusic, router, allMusics]);

  useEffect(() => {
    const storedMusics = getCookie('musics');
    if (storedMusics) {
      const parsedMusics = JSON.parse(storedMusics);
      InitMusicsFromStorageAction(parsedMusics);
    }
  }, [InitMusicsFromStorageAction]);

  useEffect(() => {
    if (allMusics && allMusics.length > 0) {
      setCookie('musics', JSON.stringify(allMusics));
    } else {
      setCookie('musics', '');
    }
  }, [allMusics]);

  const isMusicPath = router.pathname === '/music/[id]';
  const isOnMusicPage = router.pathname.startsWith('/music/');

  return (
    <>
      {selectedMusic && (
        <>
          <HeadComponent title={selectedMusic.name} />
          <Header
            setMenuIsOpen={() => {}}
            canGoBack={isMusicPath}
            pathMusic={isOnMusicPage}
          />
          <div className={s.container}>
            <div className={s.container_music}>
              <MusicItemBox
                name={selectedMusic.name}
                performer={selectedMusic.performer}
                year={selectedMusic.year}
                id={selectedMusic.id}
                onClickEdit={openEditModal}
                genre={selectedMusic.genre.title}
                pathMusic={isOnMusicPage}
              />
            </div>
          </div>
          {editIsOpen && (
            <ModalWindow
              onCloseModalWindow={closeEditModal}
              editIsOpen={editIsOpen}
              selectedMusicItem={{
                name: selectedMusic.name,
                performer: selectedMusic.performer,
                genre: {
                  value: selectedMusic.genre.value,
                  title: selectedMusic.genre.title,
                },
                year: selectedMusic.year,
              }}
              selectedMusicId={selectedMusic.id}
              deleteMusicOnClick={removeMusicAction}
            />
          )}
        </>
      )}
    </>
  );
};

export default MusicPage;
