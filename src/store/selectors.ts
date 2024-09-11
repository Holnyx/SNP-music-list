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
    if (filter === 'All') {
      return music;
    }
    return music.filter(t => t.genre.title === filter);
  }
);

export const selectedMusicSelector = createSelector(
  [musicSelector, (state, selectedMusicId) => selectedMusicId],
  (allMusics, selectedMusicId) => {
    return allMusics.find(music => music.id === selectedMusicId);
  }
);
