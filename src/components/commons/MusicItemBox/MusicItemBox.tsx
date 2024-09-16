import React, { FC, memo } from 'react';

import router from 'next/router';
import Image from 'next/image';
import starUrl from '/public/img/music-icon.svg?url';

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
  onClickEdit: (musicID: string) => void;
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
}) => {
  const musicPath = router.pathname === '/music/[id]';
  return (
    <div className={musicPath ? s['item-info'] : s['item']}>
      {musicPath ? (
        ''
      ) : (
        <button
          className={s.delete}
          title="Cancel"
          onClick={() => removeMusic?.({ musicId: id })}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={s['delete-img']}
              d="M6.74367 7.21198L19.573 19.8808L20.2458 19.1994L7.41646 6.53066L6.74367 7.21198ZM6.5418 19.784L7.24883 20.4822L20.7046 6.85577L19.9976 6.15759L6.5418 19.784Z"
              fill="#FF9900"
            />
          </svg>
        </button>
      )}

      <Image
        src={starUrl}
        alt={'music-icon'}
        className={musicPath ? s['large-icon'] : s.icon}
        priority
      />
      {musicPath ? (
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
                onClickEdit(id);
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
                onClickEdit(id);
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
