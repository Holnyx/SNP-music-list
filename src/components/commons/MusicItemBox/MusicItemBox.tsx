import React, { FC, memo } from 'react';

import router from 'next/router';
import Image from 'next/image';
import starUrl from '/public/img/music-icon.svg?url';
import deleteIconUrl from '/public/img/delete-icon.svg?url';

import s from './MusicItem.module.sass';
import cx from 'classnames';

type MusicItemItems = {
  name: string;
  performer: string;
  year?: string | number;
  genre?: string;
  id: string;
  onClickInfo?: (musicID: string) => void;
  removeMusic?: (payload: { musicId: string }) => void;
  onClickEdit?: (musicID: string) => void;
  pathMusic?: boolean;
};

const MusicItemBox: FC<MusicItemItems> = ({
  name,
  performer,
  year,
  genre,
  id,
  onClickInfo,
  removeMusic,
  onClickEdit,
  pathMusic,
}) => {
  return (
    <div className={pathMusic ? s['item-info'] : s['item']}>
      {pathMusic ? (
        ''
      ) : (
        <button
          className={s.delete}
          title="Delete"
          onClick={() => {
            removeMusic?.({ musicId: id });
          }}
        >
          <Image
            src={deleteIconUrl}
            alt={'delete-icon'}
            className={s['delete-icon']}
          />
        </button>
      )}

      <Image
        src={starUrl}
        alt={'music-icon'}
        className={pathMusic ? s['large-icon'] : s.icon}
        priority
      />
      {pathMusic ? (
        <div className={s.names}>
          <div className={s.performer}>
            <span className={s.label}>Name</span>
            <h6 className={s.names}>{name}</h6>
            <span className={s.label}>Performer</span>
            <h6 className={s.names}>{performer}</h6>
            <span className={s.label}>Genre</span>
            <h6 className={s.names}>{genre}</h6>
            {year ? (
              <>
                <span className={s.label}>Year</span>
                <h6 className={s.names}>{year}</h6>
              </>
            ) : (
              ''
            )}
          </div>
          <div className={s['buttons-container']}>
            <button
              id={id}
              className={s.button}
              onClick={() => {
                onClickEdit?.(id);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div className={s.names}>
          <div className={s.performer}>
            <div className={s.logo}>{name}</div>
            <div className={s.genre}>{performer}</div>
          </div>
          <div className={s['buttons-container']}>
            <button
              id={id}
              className={s.button}
              onClick={() => {
                onClickInfo?.(id);
              }}
            >
              Info
            </button>
            <button
              id={id}
              className={s.button}
              onClick={() => {
                onClickEdit?.(id);
              }}
            >
              Edit
            </button>
            <button
              id={id}
              className={s.button}
              onClick={() => {
                router.push(`/music/${id}`);
              }}
            >
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MusicItemBox);
