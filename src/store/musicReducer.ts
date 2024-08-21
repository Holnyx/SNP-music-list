import { MusicState } from './types';
import { Actions } from './actions';

const initialState: MusicState = {
  musicList: [],
  activeFilter: 'All',
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
    case 'INIT-MUSICS-FROM-STORAGE': {
      return { ...state, musicList: action.payload };
    }
    default:
      return state;
  }
};

export default musicReducer;
