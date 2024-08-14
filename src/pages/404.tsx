import Head from 'next/head';
import NotFoundPage from '@/components/pages/NotFound/NotFound';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>YourTour</title>
        <meta
          name="description"
          content="Идеальные путешествия существуют"
        />
        <meta
          name="keywords"
          content="путешествия, туры, туризм, отдых"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
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
      <NotFoundPage />
    </>
  );
}
