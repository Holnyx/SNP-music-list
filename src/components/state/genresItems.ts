import { v1 } from 'uuid';

type GenresItems = {
  title: string;
  id: string;
};

const genresItems: GenresItems[] = [
  { title: 'Blues', id: 'Blues' },
  { title: 'Classical', id: 'Classical' },
  { title: 'Country', id: 'Country' },
  { title: 'Dance', id: 'Dance' },
  { title: 'Electronic', id: 'Electronic' },
  { title: 'Hip-Hop', id: 'Hip-Hop' },
  { title: 'Jazz', id: 'Jazz' },
  { title: 'Latin', id: 'Latin' },
  { title: 'Rock', id: 'Rock' },
  { title: 'Pop', id: 'Pop' },
  { title: 'Reggae / Dancehall', id: 'Reggae / Dancehall' },
  { title: 'Funk', id: 'Funk' },
  { title: 'Other', id: 'Other' },
];
export default genresItems;
