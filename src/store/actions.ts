import { FilterMusicValues, GenresItems, MusicItem } from './types';

export type RemoveMusic = {
  type: 'REMOVE-MUSIC';
  payload: { musicId: string };
};

export type AddMusic = {
  type: 'ADD-MUSIC';
  payload: { music: MusicItem };
};

export type ChangeMusicsFilter = {
  type: 'CHANGE-FILTER';
  payload: FilterMusicValues;
};

export type ChangeMusicInputs = {
  type: 'CHANGE-MUSIC-INPUTS';
  payload: {
    musicId: string;
    name: string;
    performer: string;
    genre: GenresItems;
    year: string | number;
  };
};

export type InitMusicsFromStorage = {
  type: 'INIT-MUSICS-FROM-STORAGE';
  payload: MusicItem[];
};

export type Actions =
  | RemoveMusic
  | AddMusic
  | ChangeMusicsFilter
  | ChangeMusicInputs
  | InitMusicsFromStorage;

export const removeMusicAC = (payload: { musicId: string }): RemoveMusic => {
  return {
    type: 'REMOVE-MUSIC',
    payload,
  };
};

export const addMusicAC = (payload: { music: MusicItem }): AddMusic => {
  return {
    type: 'ADD-MUSIC',
    payload,
  };
};

export const changeMusicsFilterAC = (
  filter: FilterMusicValues
): ChangeMusicsFilter => {
  return {
    type: 'CHANGE-FILTER',
    payload: filter,
  };
};

export const changeMusicInputsAC = (payload: {
  musicId: string;
  name: string;
  performer: string;
  genre: GenresItems;
  year: string | number;
}): ChangeMusicInputs => ({
  type: 'CHANGE-MUSIC-INPUTS',
  payload,
});

export const InitMusicsFromStorageAC = (
  music: MusicItem[]
): InitMusicsFromStorage => ({
  type: 'INIT-MUSICS-FROM-STORAGE',
  payload: music,
});
