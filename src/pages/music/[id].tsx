import { useState, useCallback, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Header from '@/components/commons/Header/Header';
import HeadComponent from '@/components/commons/HeadComponent/HeadComponent';
import MusicItemBox from '@/components/commons/MusicItemBox/MusicItemBox';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';

import { FilterMusicValues } from '@/store/types';
import { useActionWithPayload } from '@/hooks/useAction';
import { musicSelector, selectedMusicSelector } from '@/store/selectors';
import { removeMusicAC } from '@/store/actions';

import s from './[id].module.sass';

const MusicInfoPage = () => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedMusicItem, setSelectedMusicItem] = useState({
    name: '',
    performer: '',
    genre: { value: '1', title: 'Other' as FilterMusicValues },
    year: +Number() || '',
  });

  const router = useRouter();
  
  const allMusics = useSelector(musicSelector);
  const selectedMusic = useSelector(state =>
    selectedMusicSelector(state, router.query.id)
  );

  const removeMusicAction = useActionWithPayload(removeMusicAC);

  const openEditModal = useCallback(() => {
    if (selectedMusic) {
      setSelectedMusicItem({
        name: selectedMusic.name,
        performer: selectedMusic.performer,
        genre: selectedMusic.genre,
        year: selectedMusic.year,
      });
      setEditIsOpen(true);
    }
  }, [selectedMusic]);

  const closeEditModal = useCallback(() => {
    setEditIsOpen(false);
  }, []);

  useEffect(() => {
    if (!selectedMusic) {
      router.replace('/');
    }
  }, [selectedMusic, router]);

  useEffect(() => {
    if (allMusics && allMusics.length > 0) {
      localStorage.setItem('musics', JSON.stringify(allMusics));
    } else {
      localStorage.removeItem('musics');
    }
  }, [allMusics]);

  return (
    <>
      {selectedMusic && (
        <>
          <HeadComponent title={selectedMusic.name} />
          <Header setMenuIsOpen={() => {}} />
          <div className={s.container}>
            <div className={s.container_music}>
              <MusicItemBox
                name={selectedMusic.name}
                performer={selectedMusic.performer}
                year={selectedMusic.year}
                id={selectedMusic.id}
                onClickEdit={openEditModal}
                genre={selectedMusic.genre.title}
              />
            </div>
          </div>
          {editIsOpen && (
            <ModalWindow
              onCloseModalWindow={closeEditModal}
              editIsOpen={editIsOpen}
              selectedMusicItem={selectedMusicItem}
              selectedMusicId={selectedMusic.id}
              deleteMusicOnClick={removeMusicAction}
            />
          )}
        </>
      )}
    </>
  );
};

export default memo(MusicInfoPage);
