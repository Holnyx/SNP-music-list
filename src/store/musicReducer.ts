import { MusicState } from './types';
import {
  Actions,
  ADD_MUSIC_FAILURE,
  ADD_MUSIC_SUCCESS,
  DELETE_MUSIC_FAILURE,
  DELETE_MUSIC_SUCCESS,
  GET_ALL_MUSIC_FAILURE,
  GET_ALL_MUSIC_SUCCESS,
  UPDATE_MUSIC_FAILURE,
  UPDATE_MUSIC_SUCCESS,
} from './actions';

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
    case 'CHANGE-FILTER': {
      return { ...state, activeFilter: action.payload };
    }
    case 'SET-SEARCH-QUERY':
      return { ...state, searchQuery: action.payload };

    case GET_ALL_MUSIC_SUCCESS: {
      return {
        ...state,
        musicList: action.payload,
      };
    }
    case GET_ALL_MUSIC_FAILURE: {
      console.error(action.payload);
      return state;
    }
    case ADD_MUSIC_SUCCESS: {
      return {
        ...state,
        musicList: [...state.musicList, action.payload],
      };
    }
    case ADD_MUSIC_FAILURE: {
      console.error(action.payload);
      return state;
    }
    case UPDATE_MUSIC_SUCCESS: {
      return {
        ...state,
        musicList: state.musicList.map(music =>
          music.id === action.payload.id ? action.payload : music
        ),
      };
    }
    case UPDATE_MUSIC_FAILURE: {
      console.error(action.payload);
      return state;
    }
    case DELETE_MUSIC_SUCCESS: {
      return {
        ...state,
        musicList: state.musicList.filter(
          music => music.id !== action.payload.musicId
        ),
      };
    }
    case DELETE_MUSIC_FAILURE: {
      console.error(action.payload);
      return state;
    }
    default:
      return state;
  }
};

export default musicReducer;
