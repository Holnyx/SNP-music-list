import React, { Dispatch, FC, memo, SetStateAction } from 'react';

import s from './MusicItem.module.sass';
import cx from 'classnames';

type MusicItemItems = {
  name: string;
  performer: string;
  id: string;
  onClickInfo: (musicID: string) => void;
  removeMusic: (payload: { musicId: string }) => void;
  onClickEdit: (musicID: string) => void;
};

const MusicItemBox: FC<MusicItemItems> = ({
  name,
  performer,
  id,
  onClickInfo,
  removeMusic,
  onClickEdit,
}) => {
  return (
    <div
      className={s.item}
      id={id}
    >
      <button
        className={s.delete}
        title="Cancel"
        onClick={() => removeMusic({ musicId: id })}
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
      <svg
        className={s.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="8 8 34 34"
        width="240px"
        height="240px"
      >
        <path
          d="M37,4H13c-4.962,0-9,4.037-9,9v24c0,4.963,4.038,9,9,9h24c4.962,0,9-4.037,9-9V13C46,8.037,41.962,4,37,4z M35,27v4v0.021	
          h-0.002C34.986,33.768,32.749,36,30,36h-0.5c-0.987,0-1.933-0.42-2.596-1.152c-0.662-0.731-0.985-1.718-0.887-2.705	
          C26.195,30.38,27.787,29,29.643,29H31c1.103,0,2-0.897,2-2v-9.795l-12,2.25V30v4c0,2.757-2.243,5-5,5h-0.5	
          c-0.987,0-1.933-0.42-2.596-1.152c-0.662-0.731-0.985-1.718-0.887-2.705C12.195,33.38,13.787,32,15.643,32H17c1.103,0,2-0.897,2-2	
          V15.353c0-0.963,0.687-1.79,1.633-1.966l12.591-2.36c0.439-0.083,0.891,0.033,1.234,0.319C34.803,11.632,35,12.053,35,12.5V27z"
          fill="#1d1d1d"
        />
      </svg>
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
              onClickInfo(id);
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
        </div>
      </div>
    </div>
  );
};

export default memo(MusicItemBox);
