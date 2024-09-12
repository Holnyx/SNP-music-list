import { MusicState } from './types';
import { Actions } from './actions';

const initialState: MusicState = {
  musicList: [],
  activeFilter: 'All',
  searchQuery: '',
};

const musicReducer = (
  state: MusicState = initialState,
  action: Actions
): MusicState => {
  switch (action.type) {
    case 'REMOVE-MUSIC': {
      return {
        ...state,
        musicList: state.musicList.filter(
          music => music.id !== action.payload.musicId
        ),
      };
    }
    case 'ADD-MUSIC': {
      return {
        ...state,
        musicList: [...state.musicList, action.payload.music],
      };
    }
    case 'CHANGE-FILTER': {
      return { ...state, activeFilter: action.payload };
    }
    case 'CHANGE-MUSIC-INPUTS': {
      return {
        ...state,
        musicList: state.musicList.map(music =>
          music.id === action.payload.musicId
            ? {
                ...music,
                name: action.payload.name,
                performer: action.payload.performer,
                genre: action.payload.genre,
                year: action.payload.year,
              }
            : music
        ),
      };
    }
    case 'INIT-MUSICS-FROM-STORAGE': {
      return { ...state, musicList: action.payload };
    }
    case 'SET-SEARCH-QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export default musicReducer;
