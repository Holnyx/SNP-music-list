import React from 'react';
import Header from '@/components/commons/Header/Header';
import SearchInput from '@/components/commons/SearchInput/SearchInput'
import FilterGenres from '@/components/commons/FilterGenres/FilterGenres'

import s from './HomePage.module.sass';
import cx from 'classnames';
import MusicFrame from '@/components/commons/MusicFrame/MusicFrame';
import ModalWindow from '@/components/commons/ModalWindow/ModalWindow';


const HomePage = () => {
    return (
        <div className={s.container}>
            <Header/>
            <SearchInput/>
            <FilterGenres/>
            <MusicFrame/>
            {/* <ModalWindow/> */}
        </div>
    );
};

export default HomePage;