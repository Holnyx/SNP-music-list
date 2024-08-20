// import { GenresItems } from "@/components/state/genresItems";

export type MusicItems = {
  id: string;
  name: string;
  performer: string;
  genre: GenresItems;
  year: number;
};

export type MusicState = {
  musicList: MusicItems[];
  activeFilter: FilterMusicValues;
};

export type FilterMusicValues =
  | 'Blues'
  | 'Classical'
  | 'Country'
  | 'Dance'
  | 'Electronic'
  | 'Hip-Hop'
  | 'Jazz'
  | 'Latin'
  | 'Rock'
  | 'Pop'
  | 'Reggae / Dancehall'
  | 'Funk'
  | 'Other'
  | 'All';

export type GenresItems = {
  value: string;
  title: string;
  disabled?: boolean;
};

export const genresItems: GenresItems[] = [
  { value: '1', title: 'Choose genre', disabled: true },
  { value: '2', title: 'Blues' },
  { value: '3', title: 'Classical' },
  { value: '4', title: 'Country' },
  { value: '5', title: 'Dance' },
  { value: '6', title: 'Electronic' },
  { value: '7', title: 'Hip-Hop' },
  { value: '8', title: 'Jazz' },
  { value: '9', title: 'Latin' },
  { value: '10', title: 'Rock' },
  { value: '11', title: 'Pop' },
  { value: '12', title: 'Reggae / Dancehall' },
  { value: '13', title: 'Funk' },
  { value: '14', title: 'Other' },
  { value: '15', title: 'All' },
];
