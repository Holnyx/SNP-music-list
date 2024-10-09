import { FilterMusicValues, GenresItems, MusicItem } from './types';

export const ADD_MUSIC_REQUEST = 'ADD_MUSIC_REQUEST';
export const ADD_MUSIC_SUCCESS = 'ADD_MUSIC_SUCCESS';
export const ADD_MUSIC_FAILURE = 'ADD_MUSIC_FAILURE';

export const GET_ALL_MUSIC_REQUEST = 'GET_ALL_MUSIC_REQUEST';
export const GET_ALL_MUSIC_SUCCESS = 'GET_ALL_MUSIC_SUCCESS';
export const GET_ALL_MUSIC_FAILURE = 'GET_ALL_MUSIC_FAILURE';

export const UPDATE_MUSIC_REQUEST = 'UPDATE_MUSIC_REQUEST';
export const UPDATE_MUSIC_SUCCESS = 'UPDATE_MUSIC_SUCCESS';
export const UPDATE_MUSIC_FAILURE = 'UPDATE_MUSIC_FAILURE';

export const DELETE_MUSIC_REQUEST = 'DELETE_MUSIC_REQUEST';
export const DELETE_MUSIC_SUCCESS = 'DELETE_MUSIC_SUCCESS';
export const DELETE_MUSIC_FAILURE = 'DELETE_MUSIC_FAILURE';

export const GET_MUSIC_BY_ID_REQUEST = 'GET_MUSIC_BY_ID_REQUEST';
export const GET_MUSIC_BY_ID_SUCCESS = 'GET_MUSIC_BY_ID_SUCCESS';
export const GET_MUSIC_BY_ID_FAILURE = 'GET_MUSIC_BY_ID_FAILURE';

export type AddMusicRequest = {
  type: typeof ADD_MUSIC_REQUEST;
  payload: MusicItem;
};
export type AddMusicSuccess = {
  type: typeof ADD_MUSIC_SUCCESS;
  payload: MusicItem;
};
export type AddMusicFailure = {
  type: typeof ADD_MUSIC_FAILURE;
  payload: string;
};

export type GetAllMusicRequest = {
  type: typeof GET_ALL_MUSIC_REQUEST;
  payload: MusicItem[];
};
export type GetAllMusicSuccess = {
  type: typeof GET_ALL_MUSIC_SUCCESS;
  payload: MusicItem[];
};
export type GetAllMusicFailure = {
  type: typeof GET_ALL_MUSIC_FAILURE;
  payload: string;
};

export type UpdateMusicRequest = {
  type: typeof UPDATE_MUSIC_REQUEST;
  payload: { id: string; updatedMusic: MusicItem };
};
export type UpdateMusicSuccess = {
  type: typeof UPDATE_MUSIC_SUCCESS;
  payload: MusicItem;
};
export type UpdateMusicFailure = {
  type: typeof UPDATE_MUSIC_FAILURE;
  payload: string;
};

export type DeleteMusicRequest = {
  type: typeof DELETE_MUSIC_REQUEST;
  payload: { musicId: string };
};
export type DeleteMusicSuccess = {
  type: typeof DELETE_MUSIC_SUCCESS;
  payload: { musicId: string };
};
export type DeleteMusicFailure = {
  type: typeof DELETE_MUSIC_FAILURE;
  payload: string;
};

export type ChangeMusicsFilter = {
  type: 'CHANGE-FILTER';
  payload: FilterMusicValues;
};

export type SetSearchQuery = {
  type: 'SET-SEARCH-QUERY';
  payload: string;
};

export type Actions =
  | ChangeMusicsFilter
  | SetSearchQuery
  | AddMusicRequest
  | AddMusicSuccess
  | AddMusicFailure
  | GetAllMusicRequest
  | GetAllMusicSuccess
  | GetAllMusicFailure
  | UpdateMusicRequest
  | UpdateMusicSuccess
  | UpdateMusicFailure
  | DeleteMusicRequest
  | DeleteMusicSuccess
  | DeleteMusicFailure;

export const changeMusicsFilterAC = (
  filter: FilterMusicValues
): ChangeMusicsFilter => {
  return {
    type: 'CHANGE-FILTER' as const,
    payload: filter,
  };
};
export const setSearchQueryAC = (searchQuery: string): SetSearchQuery => {
  return { type: 'SET-SEARCH-QUERY' as const, payload: searchQuery };
};

export const addMusicRequestAC = (music: MusicItem): AddMusicRequest => {
  return { type: ADD_MUSIC_REQUEST, payload: music };
};
export const addMusicSuccessAC = (music: MusicItem): AddMusicSuccess => ({
  type: ADD_MUSIC_SUCCESS,
  payload: music,
});
export const addMusicFailureAC = (error: string): AddMusicFailure => {
  return { type: ADD_MUSIC_FAILURE, payload: error };
};

export const getAllMusicRequestAC = (
  payload: MusicItem[]
): GetAllMusicRequest => ({
  type: GET_ALL_MUSIC_REQUEST,
  payload,
});
export const getAllMusicSuccessAC = (
  music: MusicItem[]
): GetAllMusicSuccess => ({
  type: GET_ALL_MUSIC_SUCCESS,
  payload: music,
});
export const getAllMusicFailureAC = (error: string): GetAllMusicFailure => ({
  type: GET_ALL_MUSIC_FAILURE,
  payload: error,
});

export const updateMusicRequestAC = (
  id: string,
  updatedMusic: MusicItem
): UpdateMusicRequest => ({
  type: UPDATE_MUSIC_REQUEST,
  payload: { id, updatedMusic },
});
export const updateMusicSuccessAC = (
  updatedMusic: MusicItem
): UpdateMusicSuccess => ({
  type: UPDATE_MUSIC_SUCCESS,
  payload: updatedMusic,
});
export const updateMusicFailureAC = (error: string): UpdateMusicFailure => ({
  type: UPDATE_MUSIC_FAILURE,
  payload: error,
});

export const deleteMusicRequestAC = (payload: {
  musicId: string;
}): DeleteMusicRequest => ({
  type: DELETE_MUSIC_REQUEST,
  payload,
});
export const deleteMusicSuccessAC = (payload: {
  musicId: string;
}): DeleteMusicSuccess => ({
  type: DELETE_MUSIC_SUCCESS,
  payload,
});
export const deleteMusicFailureAC = (error: string): DeleteMusicFailure => ({
  type: DELETE_MUSIC_FAILURE,
  payload: error,
});
