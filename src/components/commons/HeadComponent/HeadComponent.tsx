import React, { FC, memo } from 'react';
import Head from 'next/head';

type HeadComponentItems = {
  title?: string;
};

const HeadComponent: FC<HeadComponentItems> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title ? title : 'Music List'}</title>
        <meta
          name="description"
          content="Music List"
        />
        <meta
          name="keywords"
          content="music, music list, musics"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg"
        ></link>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </Head>
    </>
  );
};

export default memo(HeadComponent);
