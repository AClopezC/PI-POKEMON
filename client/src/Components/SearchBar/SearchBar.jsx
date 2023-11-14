import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../Redux/actions';

export const SearchBar = () => {

   const dispatch = useDispatch();

   const [toSearch, setToSearch] = useState('');

   const handleChange = (event) => {
      setToSearch(event.target.value)
   };

   const handleSearchByName = () => {
      if (toSearch) {
         dispatch(searchByName(toSearch))
      }
   }

   return (
      <div>
         <label>Busca un pokemon por nombre </label>
         <input onChange={handleChange} type="text" />
         <button onClick={handleSearchByName}>Search</button>
      </div>
   )
};
