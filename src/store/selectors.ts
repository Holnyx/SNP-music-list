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

export const searchQuerySelector = createSelector(
  rootSelector,
  state => state.searchQuery || ''
);

export const combinedFilteredMusicsSelector = createSelector(
  [musicSelector, musicFilterSelector, searchQuerySelector],
  (musicList, genreFilter, searchQuery) => {
    const filteredByGenre =
      genreFilter === 'All'
        ? musicList
        : musicList.filter(music => music.genre.title === genreFilter);

    return filteredByGenre.filter(
      music =>
        music.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        music.performer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);

export const selectedMusicSelector = createSelector(
  [musicSelector, (state, selectedMusicId) => selectedMusicId],
  (allMusics, selectedMusicId) => {
    return allMusics.find(music => music.id === selectedMusicId);
  }
);

// if (!searchQuery) {
//   searchQuery = '';
// }

// const filteredByGenre =
//   genreFilter === 'All'
//     ? musicList
//     : musicList.filter(music => music.genre.title === genreFilter);

// return filteredByGenre.filter(
//   music =>
//     (music.name &&
//       music.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (music.performer &&
//       music.performer.toLowerCase().includes(searchQuery.toLowerCase()))
// );
// }
