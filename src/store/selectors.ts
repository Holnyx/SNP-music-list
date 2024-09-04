import { createSelector } from 'reselect';
import { AppRootStateItems } from '.';

const rootSelector = createSelector(
  (state: AppRootStateItems) => state,
  state => state.musicList
);
export const musicSelector = createSelector(
  rootSelector,
  state => state.musicList
);
export const musicFilterSelector = createSelector(
  rootSelector,
  state => state.activeFilter
);

export const musicListSelector = createSelector(
  [musicSelector, musicFilterSelector],
  (music, filter) => {
    switch (filter) {
      case 'All': {
        return music;
      }
      case 'Other': {
        return music.filter(t => t.genre.title == 'Other');
      }
      case 'Blues': {
        return music.filter(t => t.genre.title == 'Blues');
      }
      case 'Classical': {
        return music.filter(t => t.genre.title == 'Classical');
      }
      case 'Country': {
        return music.filter(t => t.genre.title == 'Country');
      }
      case 'Dance': {
        return music.filter(t => t.genre.title == 'Dance');
      }
      case 'Electronic': {
        return music.filter(t => t.genre.title == 'Electronic');
      }
      case 'Hip-Hop': {
        return music.filter(t => t.genre.title == 'Hip-Hop');
      }
      case 'Jazz': {
        return music.filter(t => t.genre.title == 'Jazz');
      }
      case 'Latin': {
        return music.filter(t => t.genre.title == 'Latin');
      }
      case 'Rock': {
        return music.filter(t => t.genre.title == 'Rock');
      }
      case 'Pop': {
        return music.filter(t => t.genre.title == 'Pop');
      }
      case 'Reggae / Dancehall': {
        return music.filter(t => t.genre.title == 'Reggae / Dancehall');
      }
      case 'Funk': {
        return music.filter(t => t.genre.title == 'Funk');
      }
      default:
        return music;
    }
  }
);

export const selectMusic = createSelector(
  [musicSelector, (state, selectedMusicId) => selectedMusicId],
  (allMusics, selectedMusicId) => {
    return allMusics.find(music => music.id === selectedMusicId);
  }
);
