import React from 'react';
import { NavBar } from '../../Components/NavBar/NavBar';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { Cards } from '../../Components/Cards/Cards';

export const Home = () => {
   return (
      <div>
         <NavBar />
         <SearchBar />
         <Cards />
      </div>
   )
};
