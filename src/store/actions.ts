import { FilterMusicValues, MusicItems } from './types';

export type RemoveMusic = {
  type: 'REMOVE-MUSIC';
  payload: { musicId: string };
};
export type AddMusic = {
  type: 'ADD-MUSIC';
  payload: { music: MusicItems };
};
// export type ChangeTaskStatus = {
//   type: 'CHANGE-TASK-STATUS';
//   payload: { taskId: string; isDone: boolean };
// };
// export type ChangeTaskTitle = {
//   type: 'CHANGE-TASK-TITLE';
//   payload: { taskId: string; title: string };
// };
// export type ChangeAllTaskStatus = {
//   type: 'CHANGE-ALL-TASK-STATUS';
//   payload: undefined;
// };
// export type RemoveAllTasksComplete = {
//   type: 'REMOVE-ALL-TASKS-COMPLETE';
//   payload: undefined;
// };
export type ChangeTodolistFilter = {
  type: 'CHANGE-FILTER';
  payload: FilterMusicValues;
};

export type InitTodosFromStorage = {
  type: 'INIT-TODOS-FROM-STORAGE';
  payload: MusicItems[];
};

export type Actions =
  // | ChangeTaskStatus
  // | ChangeTaskTitle
  | RemoveMusic
  | AddMusic
  // | ChangeAllTaskStatus
  // | RemoveAllTasksComplete
  | ChangeTodolistFilter
  | InitTodosFromStorage;

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
// export const changeTaskStatusAC = (payload: {
//   taskId: string;
//   isDone: boolean;
// }): ChangeTaskStatus => ({
//   type: 'CHANGE-TASK-STATUS',
//   payload,
// });
// export const changeTaskTitleAC = (payload: {
//   taskId: string;
//   title: string;
// }): ChangeTaskTitle => ({
//   type: 'CHANGE-TASK-TITLE',
//   payload,
// });
// export const changeAllTaskStatusAC = (): ChangeAllTaskStatus => {
//   return {
//     type: 'CHANGE-ALL-TASK-STATUS',
//     payload: undefined,
//   };
// };
// export const removeAllTasksCompleteAC = (): RemoveAllTasksComplete => {
//   return {
//     type: 'REMOVE-ALL-TASKS-COMPLETE',
//     payload: undefined,
//   };
// };

export const changeTodolistFilterAC = (
  filter: FilterMusicValues
): ChangeTodolistFilter => {
  return {
    type: 'CHANGE-FILTER',
    payload: filter,
  };
};

export const InitTodosFromStorageAC = (
  tasks: MusicItems[]
): InitTodosFromStorage => ({
  type: 'INIT-TODOS-FROM-STORAGE',
  payload: tasks,
});
