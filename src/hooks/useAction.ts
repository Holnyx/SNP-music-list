import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';

export const useActionWithPayload = <T>(
  action: (payload: T) => PayloadAction<T>
) => {
  const dispatch = useDispatch();
  const handler = useCallback(
    (payload: T) => {
      dispatch(action(payload));
    },
    [dispatch, action]
  );

  return handler;
};

export const useAction = (action: () => PayloadAction<undefined>) => {
  const dispatch = useDispatch();

  const handler = useCallback(() => {
    dispatch(action());
  }, [dispatch, action]);

  return handler;
};
