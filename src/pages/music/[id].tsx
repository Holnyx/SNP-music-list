import { memo } from 'react';
import { useRouter } from 'next/router';

import MusicPage from '@/components/pages/MusicPage/MusicPage';

const MusicInfoPage = () => {
  const router = useRouter();
  const idMusic  = router.query.id;

  return (
    <>
      <MusicPage id={String(idMusic)} />
    </>
  );
};

export default memo(MusicInfoPage);
