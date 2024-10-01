import { memo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCookie } from 'cookies-next';

import { MusicItem } from '@/store/types';

import MusicPage from '@/components/pages/MusicPage/MusicPage';

const MusicInfoPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <MusicPage id={id} />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  const allMusicsCookie = getCookie('musics', {
    req: context.req,
  });
  const allMusics = allMusicsCookie ? JSON.parse(allMusicsCookie) : [];
  const selectedMusic = allMusics.find((music: MusicItem) => music.id === id);

  if (selectedMusic) {
    return {
      props: {
        id,
      },
    };
  }
  return {
    notFound: true,
  };
};

export default memo(MusicInfoPage);
