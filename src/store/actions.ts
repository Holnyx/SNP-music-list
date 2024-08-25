import { FilterMusicValues, MusicItems } from './types';

export type RemoveMusic = {
  type: 'REMOVE-MUSIC';
  payload: { musicId: string };
};

export type AddMusic = {
  type: 'ADD-MUSIC';
  payload: { music: MusicItems };
};

export type ChangeTodolistFilter = {
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
  | ChangeTodolistFilter
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

export const changeTodolistFilterAC = (
  filter: FilterMusicValues
): ChangeTodolistFilter => {
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
