
export type MusicItem = {
  id: string;
  name: string;
  performer: string;
  genre: GenresItems;
  year: string | number;
};

export type MusicState = {
  musicList: MusicItem[];
  activeFilter: FilterMusicValues;
  searchQuery: string
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
  title: FilterMusicValues;
  disabled?: boolean;
};
