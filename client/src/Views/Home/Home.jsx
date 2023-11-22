import React from 'react';
import { NavBar } from '../../Components/NavBar/NavBar';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { Cards } from '../../Components/Cards/Cards';
import style from './home.module.css';

export const Home = () => {
   return (
      <div className={style.page}>
         <NavBar />
         <div className={style.container}>
            <SearchBar />
            <Cards />
         </div>
      </div>
   );
};
