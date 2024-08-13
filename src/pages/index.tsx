import Head from 'next/head';
import HomePage from '@/components/pages/HomePage/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Music List</title>
        <meta
          name="description"
          content="Todo List"
        />
        <meta
          name="keywords"
          content="todo, todo list, tasks, task"
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
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <HomePage />
    </>
  );
}
