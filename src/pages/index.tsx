import { memo } from 'react';
import { GetServerSideProps } from 'next';

import HomePage from '@/components/pages/HomePage/HomePage';
import HeadComponent from '@/components/commons/HeadComponent/HeadComponent';

const Home = () => {
  return (
    <>
      <HeadComponent />
      <HomePage />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const search = context.query;

  return {
    props: {
      search,
    },
  };
};
export default memo(Home);
