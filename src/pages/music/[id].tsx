import { memo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import MusicPage from '@/components/pages/MusicPage/MusicPage';

const MusicInfoPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <MusicPage id={id} />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

export default memo(MusicInfoPage);
