import { FilterMusicValues, MusicItems } from './types';

export type RemoveMusic = {
  type: 'REMOVE-MUSIC';
  payload: { musicId: string };
};

export type AddMusic = {
  type: 'ADD-MUSIC';
  payload: { music: MusicItems };
};

export type ChangeMusicsFilter = {
  type: 'CHANGE-FILTER';
  payload: FilterMusicValues;
};

export type InitMusicsFromStorage = {
  type: 'INIT-MUSICS-FROM-STORAGE';
  payload: MusicItems[];
};

export type Actions =
  | RemoveMusic
  | AddMusic
  | ChangeMusicsFilter
  | InitMusicsFromStorage;

export const removeMusicAC = (payload: { musicId: string }): RemoveMusic => {
  return {
    type: 'REMOVE-MUSIC',
    payload,
  };
};

export const addMusicAC = (payload: { music: MusicItems }): AddMusic => {
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

export const InitMusicsFromStorageAC = (
  music: MusicItems[]
): InitMusicsFromStorage => ({
  type: 'INIT-MUSICS-FROM-STORAGE',
  payload: music,
});
